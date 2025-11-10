namespace company.betting;

using {
    cuid,
    managed
} from '@sap/cds/common';

using company.common       as common       from '../db/schema/common';
using company.tournaments  as tournaments  from '../db/schema/tournaments';
using company.teams        as teams        from '../db/schema/teams';
using company.betting      as betting      from '../db/schema/betting';
using company.matches      as matches      from '../db/schema/matches';
using company.history      as history      from '../db/schema/history';
service BettingService {

    // Public entities
    entity Nations           as projection on common.Nations;
    entity Teams             as projection on teams.Teams;
    entity Players           as projection on teams.Players;
    entity Tournaments       as projection on tournaments.Tournaments;
    entity Matches           as projection on matches.Matches;
    entity BetTypes          as projection on betting.BetTypes;
    entity TournamentEntries as projection on tournaments.TournamentEntries;
    entity PlayerStats       as projection on matches.PlayerStats;
    

    // User entities (requires auth)
    @requires: 'authenticated-user'
    entity Users             as projection on common.Users;

    @requires: 'authenticated-user'
    entity MatchBets         as projection on betting.MatchBets;

    @requires: 'authenticated-user'
    entity TournamentBets    as projection on betting.TournamentBets;

    @requires: 'authenticated-user'
    entity PointsHistory     as projection on history.PointsHistory;

    // Admin entities
    @requires: 'Admin'
    entity MatchBetTypeConfigs as projection on betting.MatchBetTypeConfigs;

    @requires: 'Admin'
    entity TournamentBetTypeConfigs as projection on betting.TournamentBetTypeConfigs;

    // Actions
    @requires: 'authenticated-user'
    action placeBet(
        matchId     : String,
        betTypeId   : String,
        prediction  : String,
        stake       : Integer
    ) returns String;

    @requires: 'Admin'
    action resolveMatch(
        matchId   : String,
        homeScore : Integer,
        awayScore : Integer
    ) returns String;
}
