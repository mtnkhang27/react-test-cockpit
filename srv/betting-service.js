const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Users, MatchBets, Matches, BetTypes } = this.entities;

    // Place bet action
    this.on('placeBet', async (req) => {
        const { matchId, betTypeId, prediction, stake } = req.data;
        const userId = req.user.id;

        try {
            const match = await SELECT.one.from(Matches).where({ ID: matchId });
            if (!match) return req.error(404, 'Match not found');
            if (match.status !== 0) return req.error(400, 'Match already started');

            const existingBet = await SELECT.one.from(MatchBets)
                .where({ user_ID: userId, match_ID: matchId, betType_ID: betTypeId });
            
            if (existingBet) return req.error(400, 'Bet already placed');

            const bet = {
                user_ID: userId,
                match_ID: matchId,
                betType_ID: betTypeId,
                predictedResult: prediction,
                stake: stake,
                potentialPoints: stake * 2,
                status: 0,
                placedAt: new Date().toISOString()
            };

            await INSERT.into(MatchBets).entries(bet);
            return 'Bet placed successfully';
        } catch (error) {
            req.error(500, error.message);
        }
    });

    // Resolve match action
    this.on('resolveMatch', async (req) => {
        const { matchId, homeScore, awayScore } = req.data;

        try {
            await UPDATE(Matches, matchId).with({
                homeScore,
                awayScore,
                status: 2
            });

            const bets = await SELECT.from(MatchBets).where({ match_ID: matchId, status: 0 });

            for (const bet of bets) {
                let isWon = false;
                const predicted = bet.predictedResult;

                if (homeScore > awayScore && predicted === 'HOME') isWon = true;
                if (homeScore < awayScore && predicted === 'AWAY') isWon = true;
                if (homeScore === awayScore && predicted === 'DRAW') isWon = true;

                await UPDATE(MatchBets, bet.ID).with({
                    status: 2,
                    isWon,
                    pointsAwarded: isWon ? bet.potentialPoints : 0,
                    resolvedAt: new Date().toISOString()
                });

                if (isWon) {
                    const user = await SELECT.one.from(Users).where({ ID: bet.user_ID });
                    await UPDATE(Users, bet.user_ID).with({
                        totalPoints: (user.totalPoints || 0) + bet.potentialPoints
                    });
                }
            }

            return `Match resolved. ${bets.length} bets processed.`;
        } catch (error) {
            req.error(500, error.message);
        }
    });

    this.before('CREATE', MatchBets, async (req) => {
        if (req.data.stake < 1 || req.data.stake > 1000) {
            req.error(400, 'Stake must be between 1 and 1000');
        }
    });
});
