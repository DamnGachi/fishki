import {randomUUID} from "crypto";
import {DATE} from "sequelize";
import owner from "../Models/Owner";

export class ImmovableDto {
    id              : number | null;
    slug            : string | null;
    floorTop         : number | null;
    floorBot         : number | null;
    floor            : number | null;
    materialType    : string | null;
    cadastralNumber : string | null;
    indexMail       : number | null;
    statusApi       : string | null;
    name            : string | null;
    region          : string;
    address         : string | null;
    addressDoc      : string | null;
    type            : string | null;
    space           : number | null;
    lat             : number | null;
    long             : number | null;
    statusId        : number | null;

    constructor(data: any) {
        this.id = data?.id || null;
        this.slug = data?.slug || `${randomUUID()}-${Date.now()}`;
        this.floorTop = data?.floorTop || 0;
        this.floorBot = data?.floorBot || 0;
        this.floor = data?.floor || 0;
        this.materialType = data?.materialType || 'неизвестно';
        this.cadastralNumber = data?.cadastralNumber || 'отсутствует';
        this.indexMail = data?.indexMail || 'отсутствует';
        this.statusApi = data?.statusApi || 'пусто';
        this.name = data?.name || 'пусто';
        this.region = data.region;
        this.address = data?.address || 'отсутствует';
        this.addressDoc = data?.addressDoc || 'отсутствует';
        this.type = data.type;
        this.space = data?.space || 'отсутствует';
        this.statusId = data?.statusId || 1;
        this.lat = data?.lat;
        this.long = data?.long;
    }
}
