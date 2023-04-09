import express, { Router } from "express";
import AuthController from "../app/Controllers/Auth/AuthController";
import RegistryController from "../app/Controllers/RegistryController";
import BidController from "../app/Controllers/BidController";

const router: Router = express();

router.get('/', (req, res) => {
    res.send("HELLO");
});
router.get('/api/service/auth/sync', AuthController.sync);
router.post('/api/service/auth/', AuthController.login);

router.get('/api/service/registry', RegistryController.getAll);
router.put('/api/service/registry/create', RegistryController.create);
router.get('/api/service/registry/resource', RegistryController.resource);
router.post('/api/service/registry/:id/update', RegistryController.update);
router.post('/api/service/registry/:id/source', RegistryController.source);

router.get('/api/service/bid', BidController.getAll)
router.put('/api/service/bid/create', BidController.create)
router.post('/api/service/bid/:id/update', BidController.update)
router.post('/api/service/bid/:id/changeStatus', BidController.updateStatus);


export default router;
