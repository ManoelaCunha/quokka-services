import { Router, Application } from 'express';
import { createCondomonium } from '../../controllers';
import { validateShape, validateToken } from '../../middlewares';
import { SuperAdminRepository } from '../../repositories';
import { createCondominium as createCondominiumShape } from '../../shapes';

const router = Router();

const condominiumRoutes = (app: Application) => {
    router.post(
        '/condominiums',
        validateToken(SuperAdminRepository),
        validateShape(createCondominiumShape),
        createCondomonium,
    );
    app.use(router);
};

export default condominiumRoutes;
