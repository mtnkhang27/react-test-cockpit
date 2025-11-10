namespace company.history;

using {
    cuid,
    managed
} from '@sap/cds/common';

// Cùng namespace nên dùng trực tiếp
using company.betting as bettings from './betting';
using company.common as common from './common';
using company.matches as matches from './matches';
using company.tournaments as tournaments from './tournaments';
using company.teams as teams from './teams';
entity PointsHistory : cuid, managed {
    user          : Association to common.Users;    
    points        : Integer;
    reason        : String(255);
    matchBet      : Association to matches.Matches;
    tournamentBet : Association to bettings.TournamentBets;
}

entity BetOddsTemplates : cuid, managed {
    betType        : Association to bettings.BetTypes;
    condition      : String(200);
    oddsMultiplier : Decimal(5, 2);
    description    : String(500);
}

entity ScoringRules : cuid, managed {
    betType        : Association to bettings.BetTypes;
    basePoints     : Integer;
    bonusCondition : String(500);
    bonusPoints    : Integer;
    active         : Boolean;
}
