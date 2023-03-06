function rpcClaimDailyReward(context: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    var response = { coinsReceived: 0 };

    var dailyReward = getLastDailyRewardObject(context, logger, nk, payload);
    if (canUserClaimDailyReward(dailyReward)) {
        response.coinsReceived = 500;

        var changeset = {
            coins: response.coinsReceived,
        }

        try {
            nk.walletUpdate(context.userId, changeset, {}, false);
        } catch (error) {
            logger.error('walletUpdate error: %q', error);
            throw error;
        }

        var notification: nkruntime.NotificationRequest = {
            code: 1001,
            content: changeset,
            persistent: true,
            subject: "You've received your daily reward!",
            userId: context.userId,
        }

        try {
            nk.notificationsSend([notification]);
        } catch (error) {
            logger.error('notificationsSend error: %q', error);
            throw error;
        }

        dailyReward.lastClaimUnix = msecToSec(Date.now());

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
            nk.storageWrite([ write ])
        } catch (error) {
            logger.error('storageWrite error: %q', error);
            throw error;
        }
    }

    var result = JSON.stringify(response);
    logger.debug('rpcClaimDailyReward response: %q', result)

    return result;
}
