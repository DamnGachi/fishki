import Immovable from "../Models/Immovable";
import Owner from "../Models/Owner";
import {ImmovableDto} from "../Dto/ImmovableDto";

class ImmovableService {
    async getAll() {
        try {
            return await Immovable.findAll({include: [{model: Owner, include: ['fs'],}, 'status'],});
        } catch (error) {
            throw error;
        }
    }

    async create(data: any) {
        try {
            const immovableObject = new ImmovableDto(data);
            return await Immovable.create(immovableObject);
        } catch (error) {
            throw error;
        }
    }

    async update(data: any) {
        try {
            const immovableObject = new ImmovableDto(data);
            return await Immovable.upsert(immovableObject);
        } catch (error) {
            throw error;
        }
    }

}

export default new ImmovableService();
