namespace company.teams;

using {
    cuid,
    managed
} from '@sap/cds/common';

using company.common as common from './common';

entity Teams : cuid, managed {
    name      : String(200);
    shortCode : String(10);
    nation    : Association to common.Nations;
}

entity Players : cuid, managed {
    team        : Association to Teams;
    fullName    : String(200);
    position    : Integer enum {
        Goalkeeper    = 0;
        RightBack     = 1;
        CenterBack    = 2;
        LeftBack      = 3;
        DefensiveMid  = 4;
        CentralMid    = 5;
        AttackingMid  = 6;
        RightWinger   = 7;
        LeftWinger    = 8;
        Striker       = 9;
        SecondStriker = 10;
        WingBack      = 11;
        Sweeper       = 12;
        Substitute    = 13;
    };
    nationality : Association to common.Nations;
}
