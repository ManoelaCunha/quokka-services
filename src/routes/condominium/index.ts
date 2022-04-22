import { Router, Application } from 'express';
import { createCondomonium, loginCondominium } from '../../controllers';
import { authToken, validateShape, validateToken } from '../../middlewares';
import {
    SuperAdminRepository,
    CondominiumRepository,
} from '../../repositories';
import {
    createCondominium as createCondominiumShape,
    loginCondominium as loginCondominiumShape,
} from '../../shapes';

const router = Router();

const condominiumRoutes = (app: Application) => {
    router.post(
        '/condominiums',
        validateToken(SuperAdminRepository),
        validateShape(createCondominiumShape),
        createCondomonium,
    );

    router.post(
        '/condominiums/login',
        validateShape(loginCondominiumShape),
        authToken(CondominiumRepository),
        loginCondominium,
    );

    app.use(router);
};

export default condominiumRoutes;
