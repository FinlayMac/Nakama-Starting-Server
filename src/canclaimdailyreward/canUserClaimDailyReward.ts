function canUserClaimDailyReward(dailyReward: any) {
    if (!dailyReward.lastClaimUnix) {
        dailyReward.lastClaimUnix = 0;
    }

    var d = new Date();
    d.setHours(0, 0, 0, 0);

    return dailyReward.lastClaimUnix < msecToSec(d.getTime());
}

function msecToSec(n: number): number {
    return Math.floor(n / 1000);
}
