namespace company.common;

using {
    cuid,
    managed
} from '@sap/cds/common';

@assert.unique: {Nations: [
    name,
    isoCode,
    region
]}
entity Nations : cuid, managed {
    name    : String(200);
    isoCode : String(8);
    region  : String(100);
}

entity Users : cuid, managed {
    employeeId   : String(50);
    email        : String(200);
    fullName     : String(200);
    passwordHash : String(200);
    role         : Integer enum {
        Player    = 0;
        Admin     = 1;
        Moderator = 2;
    };
    isActive     : Boolean default true;
    totalPoints  : Integer default 0;
}
