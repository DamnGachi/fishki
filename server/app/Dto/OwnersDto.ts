export class OwnersDto {
    owners: any[];

    constructor(data: any) {
        this.owners = data.Owners.length ? data.Owners : [];
    }
}
