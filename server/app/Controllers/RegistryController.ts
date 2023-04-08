import ImmovableService from "../Services/ImmovableService";
import {Request, Response} from "express";

class RegistryController {
    async getAll(req: Request, res: Response) {
        try {
            const result = await ImmovableService.getAll();
            res.send(result).status(200);
        } catch (error) {
            res.send("error").status(500);
        }
    }
}

export default new RegistryController();
