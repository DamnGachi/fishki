export class RoleDto {
    id          : number;
    slug        : string;
    title       : string;

    constructor(data:any) {
        this.id           = data.id;
        this.slug         = data.slug;
        this.title        = data.title;
    }

}
