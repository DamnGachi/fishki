import express,{Router} from "express";
import AuthController from "../app/Controllers/Auth/AuthController";
import RegistryController from "../app/Controllers/RegistryController";

const router:Router = express();

router.get('/', (req, res) => {
    res.send("HELLO");
});
router.get('/api/service/auth/sync',    AuthController.sync);
router.post('/api/service/auth/',       AuthController.login);

router.get('/api/service/registry',     RegistryController.getAll);
router.put('/api/service/registry/create',     RegistryController.create);
router.put('/api/service//registry/:id/update',     RegistryController.update);




export default router;
