import express,{Router} from "express";
import AuthController from "../app/Controllers/Auth/AuthController";
const router:Router = express();

router.get('/', (req, res) => {
    res.send("res");
});
router.get('/api/service/auth/sync', AuthController.sync);




export default router;
