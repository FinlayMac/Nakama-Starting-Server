function rpcCanClaimDailyReward(
    ctx: nkruntime.Context,
    logger: nkruntime.Logger,
    nk: nkruntime.Nakama,
    payload: string): string {

    var dailyReward = getLastDailyRewardObject(ctx, logger, nk, payload);
    var response = {
        canClaimDailyReward: canUserClaimDailyReward(dailyReward)
    }

    var result = JSON.stringify(response);
    logger.debug('rpcCanClaimDailyReward response: %q', result);

    return result;

}
