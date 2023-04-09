import BidOwner from "../Models/BidOwner";
import Fs from "../Models/Fs";
import { BidDto } from "../Dto/BidDto";
import { BidOwnerDto } from "../Dto/BidOwnerDto";
import { ActionEnums } from "../Enums/ActionEnums";
import Bid from "../Models/Bid";
import Owner from "../Models/Owner";

class BidService {
    async getAll() {
        try {
            return await Bid.findAll({ include: [{ model: Owner, include: ['fs'], }, 'status'], });
        } catch (error) {
            throw error;
        }
    }

    async findOne(index: any) {
        try {
            return await Bid.findAll({ where: { id: index }, include: [{ model: BidOwner, include: ['fs'], }, 'status'] },);
        } catch (error) {
            throw error;
        }
    }
    async create(data: any) {
        try {
            if (data.userId) new Error("error by id or userId");
            const BidObject = new BidDto(data);
            const Owners = new BidOwnerDto(data);
            const BidNew = await Bid.create(BidObject);
            await BidNew.save();
            const BidId = await BidNew.get('id');

            if (BidId && Owners.owners.length) {
                const addBidId = (owner: any) => {
                    owner.BidId = BidId;
                    return owner;
                };
                const owners = Owners.owners.map(addBidId);
                await BidOwner.bulkCreate(owners)
            }
            return await this.findOne(BidId);
        } catch (error) {
            throw error;
        }
    }


    async update(data: any, index: number) {
        try {
            if (!index && data.userId) new Error("error by id or userId");
            const BidObject = new BidDto(data);
            const immovable = await Bid.upsert(BidObject);
            const Owners = new BidOwnerDto(data);
            const newOwners = Owners.owners.filter(owner => !owner.id);
            const updatedOwners = Owners.owners.filter(owner => owner.id).map(item => {
                delete item.BidId
                return item;
            });
            if (newOwners.length) {
                const addBidId = (owner :any) => {
                    owner.BidId = index;
                    return owner;
                };
                const owners = newOwners.map(addBidId);
                await Owner.bulkCreate(owners);
            }
            if (updatedOwners.length) {
                for (let i = 0; i < updatedOwners.length; i++) {
                    await Owner.upsert(updatedOwners[i]);
                }
            }
            return await this.findOne(index);
        } catch (error) {
            throw error;
        }
    }

    async changeStatus(data: any, index: number, status: string) {
        try {
            const bid = await this.findOne(index);
            if (!bid) throw new Error('Bid not found');

            const updatedBid = await Bid.update({ status }, { where: { id: index } });

            return updatedBid;
        } catch (error) {
            throw error;
        }
    }
}

export default new BidService();
