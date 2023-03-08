function getWinGameStats(context: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama): any {
    if (!context.userId) {
        throw Error('No user ID in context');
    }

    //sets up the load users previous wins request
    var objectId: nkruntime.StorageReadRequest = {
        collection: 'stats',
        key: 'wins',
        userId: context.userId,
    }

    //try and retrieve any items that match the above query
    var objects: nkruntime.StorageObject[];
    try {
        objects = nk.storageRead([objectId]);
    } catch (error) {
        logger.error('storageRead error: %s', error);
        throw error;
    }

    //sets the value to the default of 0
    var numberOfWins: any = {
        wins: 0,
    }

    //for each item with the key, update the number of wins value
    objects.forEach(function (object) {
        if (object.key == 'wins') {
            numberOfWins = object.value;
        }
    });

    return numberOfWins;
}
