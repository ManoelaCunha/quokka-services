import { Router, Application } from 'express';
import { createCondomonium } from '../../controllers';
import getAllCondominiums from '../../controllers/condominiums/getAll.controller';
import { validateShape, validateToken } from '../../middlewares';
import {
    CondominiumRepository,
    SuperAdminRepository,
} from '../../repositories';
import { createCondominium as createCondominiumShape } from '../../shapes';

const router = Router();

const condominiumRoutes = (app: Application) => {
    router.post(
        '/condominiums',
        validateToken(SuperAdminRepository),
        validateShape(createCondominiumShape),
        createCondomonium,
    );

    router.get(
        '/condominiums',
        validateToken(SuperAdminRepository),
        getAllCondominiums,
    );

    app.use(router);
};

export default condominiumRoutes;
