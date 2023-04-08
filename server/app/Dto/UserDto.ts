export class UserDto {

    id          : number;
    slug        : string;
    email       : string;
    firstName    : string;
    lastName    : string;
    roleId      : number;
    jobTitle    : string;
    isActive    : boolean;
    password    : string | number;


    constructor(data:any) {
        this.id           = data.id;
        this.slug         = data.slug;
        this.email        = data.email;
        this.firstName     = data.firstName;
        this.lastName     = data.lastName;
        this.isActive     = data.isActive;
        this.password     = data.password;
        this.roleId       = data.roleId;
        this.jobTitle     = data.jobTitle;
    }

}
