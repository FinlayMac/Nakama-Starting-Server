function rpcClaimDailyReward(
    ctx: nkruntime.Context,
    logger: nkruntime.Logger,
    nk: nkruntime.Nakama,
    payload: string): string {
    logger.info('claimed daily rpc');
    return JSON.stringify({ success: true });
}
