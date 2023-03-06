function rpcCanClaimDailyReward(
    ctx: nkruntime.Context,
    logger: nkruntime.Logger,
    nk: nkruntime.Nakama,
    payload: string): string {
    logger.info('can claim daily rpc called');
    return JSON.stringify({ success: true });
}
