import express,{Router} from "express";
import AuthController from "../app/Controllers/Auth/AuthController";
const router:Router = express();

router.get('/', (req, res) => {
    res.send("HELLO");
});
router.get('/api/service/auth/sync', AuthController.sync);
router.post('/api/service/auth/', AuthController.login);




export default router;
