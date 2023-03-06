function InitModule(
    ctx: nkruntime.Context,
    logger: nkruntime.Logger,
    nk: nkruntime.Nakama,
    initializer: nkruntime.Initializer) {
        initializer.registerRpc('healthcheck', rpcHealthcheck);
        initializer.registerRpc('canclaimdailyreward', rpcCanClaimDailyReward);
        initializer.registerRpc('claimdailyreward', rpcClaimDailyReward);
        logger.info('JS module loaded');

}
