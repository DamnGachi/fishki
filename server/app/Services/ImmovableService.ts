import Immovable from "../Models/Immovable";
import Owner from "../Models/Owner";
import Fs from "../Models/Fs";

class ImmovableService {
   async getAll() {
        try {
            return await Immovable.findAll({include:[ {model: Owner, include: ['fs'], }, 'status'], });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default new ImmovableService();
