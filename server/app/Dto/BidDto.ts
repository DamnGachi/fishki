import { randomUUID } from "crypto";
import { DATE } from "sequelize";
import owner from "../Models/Owner";

export class BidDto {
    id: number | null;
    slug: string | null;
    cadastralNumber: string | null;
    region: string;
    address: string | null;
    cadastralArea: string | null;
    name: string | null;
    addressDoc: string | null;
    indexMail: number | null;
    space: number | null;
    floorTop: number | null;
    floorBot: number | null;
    floor: number | null;
    type: string | null;
    actionTypeId: string | null;
    comment: string | null;
    statusId: number | null;

    constructor(data: any) {
        this.id = data?.id || null;
        this.slug = data?.slug || `${randomUUID()}-${Date.now()}`;
        this.floorTop = data?.floorTop || 0;
        this.floorBot = data?.floorBot || 0;
        this.floor = data?.floor || 0;
        this.cadastralArea = data?.floor || 0;
        this.actionTypeId = data?.actionTypeId || 'неизвестно';
        this.cadastralNumber = data?.cadastralNumber || 'отсутствует';
        this.indexMail = data?.indexMail || 'отсутствует';
        this.name = data?.name || 'пусто';
        this.region = data.region;
        this.address = data?.address || 'отсутствует';
        this.addressDoc = data?.addressDoc || 'отсутствует';
        this.type = data.type;
        this.space = data?.space || 'отсутствует';
        this.statusId = data?.statusId || 1;
        this.comment = data?.comment || 'отсутствует';
    }
}
