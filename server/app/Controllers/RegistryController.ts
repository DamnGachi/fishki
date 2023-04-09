import ImmovableService from "../Services/ImmovableService";
import {Request, Response} from "express";

class RegistryController {
    async getAll(req: Request, res: Response) {
        try {
            const result = await ImmovableService.getAll();
            res.send(result).status(200);
        } catch (error) {
            res.send(error).status(500);
        }
    }

    async resource (req: Request, res: Response)  {
        try {
            const result = await ImmovableService.resource();
            res.send(result).status(200);
        } catch(error) {
            res.send(error).status(500);
        }
    }

    async create (req: Request, res: Response) {
        try {
            const result = await ImmovableService.create(req.body);
            res.send(result).status(200);
        } catch (error) {
            res.send({error}).status(500);
        }
    }

    async update (req: Request, res: Response)  {
        try {
            const result = await ImmovableService.update(req.body, Number(req.params.id));
            res.send(result).status(200);
        } catch (error) {
            res.send({error}).status(500);
        }
    }

    async source(req: Request, res: Response) {

    }


}

export default new RegistryController();
