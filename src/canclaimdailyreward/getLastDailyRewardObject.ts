function getLastDailyRewardObject(context: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string) : any {
    if (!context.userId) {
        throw Error('No user ID in context');
    }

    if (payload) {
        throw Error('No input allowed');
    }

    var objectId: nkruntime.StorageReadRequest = {
        collection: 'reward',
        key: 'daily',
        userId: context.userId,
    }

    var objects: nkruntime.StorageObject[];
    try {
        objects = nk.storageRead([ objectId ]);
    } catch (error) {
        logger.error('storageRead error: %s', error);
        throw error;
    }

    var dailyReward: any = {
        lastClaimUnix: 0,
    }

    objects.forEach(function (object) {
        if (object.key == 'daily') {
            dailyReward = object.value;
        }
    });

    return dailyReward;
}
