function rpcClaimDailyReward(context: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    //assumes that the player will receive no coins first
    var response = { coinsReceived: 0 };

    //finds when the player last claimed a reward
    var dailyReward = getLastDailyRewardObject(context, logger, nk, payload);
    if (canUserClaimDailyReward(dailyReward)) {
        //update the response
        response.coinsReceived = 500;

        var changeset = {
            coins: response.coinsReceived,
        }
        //try to update the coin amount in wallet
        try {
            nk.walletUpdate(context.userId, changeset, {}, false);
        } catch (error) {
            logger.error('walletUpdate error: %q', error);
            throw error;
        }
        //creates a notification
        var notification: nkruntime.NotificationRequest = {
            code: 1001,
            content: changeset,
            persistent: true,
            subject: "You've received your daily reward!",
            userId: context.userId,
        }

        //trys to send the notification
        try {
            nk.notificationsSend([notification]);
        } catch (error) {
            logger.error('notificationsSend error: %q', error);
            throw error;
        }
        //updates the last claimed time
        dailyReward.lastClaimUnix = msecToSec(Date.now());
        //writes the value to the DB
        var write: nkruntime.StorageWriteRequest = {
            collection: 'reward',
            key: 'daily',
            permissionRead: 1,
            permissionWrite: 0,
            value: dailyReward,
            userId: context.userId,
        }

        if (dailyReward.version) {
            // Use OCC to prevent concurrent writes.
            write.version = dailyReward.version
        }

        // Update daily reward storage object for user.
        try {
            nk.storageWrite([write])
        } catch (error) {
            logger.error('storageWrite error: %q', error);
            throw error;
        }
    }

    var result = JSON.stringify(response);
    logger.debug('rpcClaimDailyReward response: %q', result)

    return result;
}
