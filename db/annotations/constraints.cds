// Import namespace để annotate
using company.common       as common       from '../schema/common';
using company.tournaments  as tournaments  from '../schema/tournaments';
using company.teams        as teams        from '../schema/teams';
using company.betting      as betting      from '../schema/betting';
using company.matches      as matches      from '../schema/matches';
using company.history      as history      from '../schema/history';
// Annotate entities
annotate common.Users with @assert.unique: {
    uniqueEmployee: [employeeId],
    uniqueEmail   : [email]
};

annotate common.Nations with @assert.unique: {
    uniqueNationCode: [isoCode],
    uniqueNationName: [name],
    uniqueNationRegion: [region]
};

annotate tournaments.Tournaments with @assert.unique: {
    uniqueNameSeason: [name, season]
};

annotate teams.Teams with @assert.unique: {
    uniqueTeamNation: [name, nation],
    uniqueShortCode : [shortCode]
};

annotate teams.Players with @assert.unique: {
    uniquePlayerInTeam: [team, fullName]
};

annotate matches.Matches with @assert.unique: {
    uniqueMatchPerTournament: [tournament, homeTeam, awayTeam, kickOff]
};

annotate matches.PlayerStats with @assert.unique: {
    uniquePlayerMatchStat: [match, player]
};

annotate betting.BetTypes with @assert.unique: {
    uniqueBetTypeCode: [code],
    uniqueBetTypeName: [name]
};

annotate betting.MatchBetTypeConfigs with @assert.unique: {
    uniqueMatchBetTypeConfig: [match, betType]
};

annotate betting.TournamentBetTypeConfigs with @assert.unique: {
    uniqueTournamentBetTypeConfig: [tournament, betType]
};

annotate betting.MatchBets with @assert.unique: {
    uniqueUserMatchBetType: [user, match, betType]
};

annotate betting.TournamentBets with @assert.unique: {
    uniqueUserTournamentBetType: [user, tournament, betType]
};

annotate history.BetOddsTemplates with @assert.unique: {
    uniqueBetTypeCondition: [betType, condition]
};

annotate history.ScoringRules with @assert.unique: {
    uniqueBetTypeBonusCondition: [betType, bonusCondition]
};

annotate history.PointsHistory with @assert.unique: {
    uniqueMatchBetHistory     : [matchBet],
    uniqueTournamentBetHistory: [tournamentBet]
};

annotate tournaments.TournamentEntries with @assert.unique: {
    uniqueTournamentTeam: [tournament, team]
};



