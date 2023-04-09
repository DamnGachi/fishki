import {Response, Request} from "express";

class WorkingGroupController {

    async getAll(req: Request, res: Response) {
        res.send("test");
    }

    async create(req: Request, res: Response) {
        res.send("test");
    }

    async update(req: Request, res: Response) {
        res.send("test");
    }

    async delete(req: Request, res: Response) {
        res.send("test");
    }
}

export default new WorkingGroupController();
