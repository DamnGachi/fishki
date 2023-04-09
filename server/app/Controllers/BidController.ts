import { Request, Response } from "express";
import BidService from "../Services/BidService";
class BidController {
    async getAll(req: Request, res: Response) {
        try {
            const result = await BidService.getAll();
            res.send(result).status(200);
        } catch (error) {
            res.send(error).status(500);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const result = await BidService.create(req.body);
            res.send(result).status(200);
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const result = await BidService.update(req.body, Number(req.params.id));
            res.send(result).status(200);
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
    async updateStatus(req: Request, res: Response) {
        try {
            const result = await BidService.changeStatus(req.body, Number(req.params.id), req.params.status);
            res.send(result).status(200);
        } catch (error) {
            res.send({ error }).status(500);
        }
    }
}


export default new BidController();
