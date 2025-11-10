namespace company.tournaments;

using {
    cuid,
    managed
} from '@sap/cds/common';

// Cùng namespace nên không cần import Nations, Teams
using company.common as common from './common';
using company.teams as teams from './teams';

entity Tournaments : cuid, managed {
    name       : String(200);
    season     : String(50);
    startDate  : Date;
    endDate    : Date;
    hostNation : Association to common.Nations;
}

entity TournamentEntries : cuid, managed {
    tournament   : Association to Tournaments;
    team         : Association to teams.Teams;
    played       : Integer default 0;
    won          : Integer default 0;
    drawn        : Integer default 0;
    lost         : Integer default 0;
    goalsFor     : Integer default 0;
    goalsAgainst : Integer default 0;
    goalDiff     : Integer default 0;
    points       : Integer default 0;
    cleanSheets  : Integer default 0;
}
