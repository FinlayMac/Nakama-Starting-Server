function rpcWinGameStats(
    ctx: nkruntime.Context,
    logger: nkruntime.Logger,
    nk: nkruntime.Nakama,
    payload: string): string {

    logger.info('win game stats called');

    if (!ctx.userId) {
        throw Error('No user ID in context');
    }

    //cant find matchID atm
    // if (!ctx.matchId) {
    //     throw Error('No valid match ID in context');
    // }

    // if (!payload) {
    //     throw Error('payload expected');
    // }

    var numberOfWins = getWinGameStats(ctx, logger, nk);

    //unpack payload which has match ID?
    logger.info(payload);

    //adds one to the win count
    numberOfWins.wins++;

    //writes the value to the DB
    var write: nkruntime.StorageWriteRequest = {
        collection: 'stats',
        key: 'wins',
        permissionRead: 2,
        permissionWrite: 0,
        value: numberOfWins,
        userId: ctx.userId,
    }

    if (numberOfWins.version) {
        // Use OCC to prevent concurrent writes.
        write.version = numberOfWins.version
    }

    // Update win stats storage object for user.
    try {
        nk.storageWrite([write])
    } catch (error) {
        logger.error('storageWrite error: %q', error);
        throw error;
    }

    return JSON.stringify({ success: true });
}
