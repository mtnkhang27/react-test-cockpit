namespace company.betting;

using {
    cuid,
    managed
} from '@sap/cds/common';

using company.common as common from './common';
using company.matches as matches from './matches';
using company.tournaments as tournaments from './tournaments';
using company.teams as teams from './teams';
using company.betting as bettings from './betting';

// Cùng namespace company.betting nên dùng trực tiế
entity BetTypes : cuid, managed {
    code        : String(50);
    name        : String(200);
    description : String(4000);
    scope       : Integer enum {
        Match = 0;
        Tournament = 1;
    };
    category    : Integer enum {
        Result = 0;
        Player = 1;
        Team = 2;
        Special = 3;
    };
    isActive    : Boolean default true;
}

entity BetOptions : cuid, managed {
    betType     : Association to BetTypes;
    code        : String(50);
    description : String(4000);
    value       : String(200); 
    odds        : Decimal(5, 2) default 1.00;
}

entity MatchBetTypeConfigs : cuid, managed {
    match          : Association to matches.Matches;
    betType        : Association to BetTypes;
    oddsMultiplier : Decimal(5, 2) default 1.00;
    basePoints     : Integer default 100;
    isEnabled      : Boolean default true;
    bettingOpenAt  : Timestamp;
    bettingCloseAt : Timestamp;
}

entity TournamentBetTypeConfigs : cuid, managed {
    tournament     : Association to tournaments.Tournaments;
    betType        : Association to BetTypes;
    oddsMultiplier : Decimal(5, 2) default 1.00;
    basePoints     : Integer default 500;
    isEnabled      : Boolean default true;
    bettingOpenAt  : Timestamp;
    bettingCloseAt : Timestamp;
}

entity MatchBets : cuid, managed {
    user            : Association to common.Users;
    config          : Association to MatchBetTypeConfigs;
    match           : Association to matches.Matches;
    betType         : Association to BetTypes;
    predictedResult : String(20); 
    predictedScore  : String(10);
    predictedPlayer : Association to teams.Players;
    stake           : Integer default 10;
    potentialPoints : Integer default 0;
    status          : Integer enum {
        Pending = 0;
        Locked = 1;
        Resolved = 2;
    } default 0;
    isWon           : Boolean default false;
    pointsAwarded   : Integer default 0;
    placedAt        : Timestamp;
    resolvedAt      : Timestamp;
}

entity TournamentBets : cuid, managed {
    user                    : Association to common.Users;
    config                  : Association to TournamentBetTypeConfigs;
    tournament              : Association to tournaments.Tournaments;
    betType                 : Association to BetTypes;
    predictedChampion       : Association to teams.Teams;
    predictedTopScorer      : Association to teams.Players;
    predictedMostCleanSheet : Association to teams.Teams;
    predictedTopTeams       : String(500);
    stake                   : Integer default 50;
    potentialPoints         : Integer default 0;
    status                  : Integer default 0;
    isWon                   : Boolean default false;
    pointsAwarded           : Integer default 0;
    placedAt                : Timestamp;
    resolvedAt              : Timestamp;
}
