namespace company.matches;

using {
    cuid,
    managed
} from '@sap/cds/common';

// Cùng namespace nên dùng trực tiếp Tournaments, Teams, Players

using company.tournaments as tournaments from './tournaments';
using company.teams as teams from './teams';

entity Matches : cuid, managed {
    tournament : Association to tournaments.Tournaments;
    homeTeam   : Association to teams.Teams;
    awayTeam   : Association to teams.Teams;
    kickOff    : Timestamp;
    status     : Integer enum {
        Scheduled = 0;
        Live      = 1;
        Finished  = 2;
        Cancelled = 3;
    } default 0;
    homeScore  : Integer default 0;
    awayScore  : Integer default 0;
}

entity PlayerStats : cuid, managed {
    match      : Association to Matches;
    player     : Association to teams.Players;
    goals      : Integer default 0;
    assists    : Integer default 0;
    cleanSheet : Boolean default false;
    isMvp      : Boolean default false;
}
