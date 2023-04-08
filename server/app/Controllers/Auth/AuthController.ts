import {Request, Response} from "express";
import AuthService from "../../Services/AuthService";

class AuthController {

    async login(req:Request, res:Response) {
        try {
            const result = await AuthService.authUser(req.body);
            if (result) res.send(result).status(201);
            else res.status(500).send("Неудача =(");
        } catch (error) {
            res.status(500).send("Неудача =(");
        }
    }

    sync(req:Request, res:Response) {
    }
}

export default new AuthController();
