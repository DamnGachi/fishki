import Immovable from "../Models/Immovable";
import Owner from "../Models/Owner";
import ImmovableHistory from "../Models/ImmovableHistory";
import Fs from "../Models/Fs";
import {ImmovableDto} from "../Dto/ImmovableDto";
import {OwnersDto} from "../Dto/OwnersDto";
import {ActionEnums} from "../Enums/ActionEnums";
import immovable from "../Models/Immovable";

class ImmovableService {
    async getAll() {
        try {
            return await Immovable.findAll({include: [{model: Owner, include: ['fs'],}, 'status', 'history'],});
        } catch (error) {
            throw error;
        }
    }

    async findOne(index : any) {
        try {
            return await Immovable.findAll({where: {id: index},include: [{model: Owner, include: ['fs'],}, 'status', 'history']},);
        } catch (error) {
            throw error;
        }
    }

    async resource() {
        try {
            const fs = await Fs.findAll();
            return  {
                fs: fs,
            };
        } catch (error) {
             throw error;
        }
    }

    async create(data: any) {
        try {
            if (data.userId) new Error("error by id or userId");
            const immovableObject = new ImmovableDto(data);
            const Owners = new OwnersDto(data);
            const immovableNew = await Immovable.create(immovableObject);
            await immovableNew.save();
            const immovableId = await immovableNew.get('id');
            await this.logging(immovableId,data.userId, ActionEnums.CREATED_CARD);

            if (immovableId && Owners.owners.length) {
                const addImmovableId = (owner:any) => {
                  owner.immovableId = immovableId;
                  return owner;
                };
                const owners = Owners.owners.map(addImmovableId);
                await Owner.bulkCreate(owners)
                await this.logging(immovableId,data.userId, ActionEnums.CREATED_OWNER_CARD);
            }
            return await this.findOne(immovableId);
        } catch (error) {
            throw error;
        }
    }

    async update(data: any, index: number) {
        try {
            if (!index && data.userId) new Error("error by id or userId");
            const immovableObject = new ImmovableDto(data);
            const immovable = await Immovable.upsert(immovableObject);
            await this.logging(index,data.userId, ActionEnums.UPDATED_CARD);
            const Owners = new OwnersDto(data);
            const newOwners = Owners.owners.filter(owner => !owner.id);
            const updatedOwners = Owners.owners.filter(owner => owner.id).map(item => {
                delete item.ImmovableId
                return item;
            });
            if (newOwners.length) {
                const addImmovableId = (owner:any) => {
                    owner.immovableId = index;
                    return owner;
                };
                const owners = newOwners.map(addImmovableId);
                await Owner.bulkCreate(owners);
                await this.logging(index,data.userId, ActionEnums.CREATED_OWNER_CARD);
            }
            if (updatedOwners.length) {
                for (let i = 0; i < updatedOwners.length ; i++) {
                    await Owner.upsert(updatedOwners[i]);
                }
                await this.logging(index,data.userId, ActionEnums.UPDATED_OWNER_CARD);
            }
            return await this.findOne(index);
        } catch (error) {
            throw error;
        }
    }


    async logging(immovableId: any,userId :number, actionType : string) {
        try {
            if (userId) {
                const history = {
                    userId: userId,
                    immovableId: immovableId,
                    action: actionType,
                }
                await ImmovableHistory.create(history);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ImmovableService();
