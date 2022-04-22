import { Router, Application } from 'express';

import {
    createCondomonium,
    loginCondominium,
    retrieveCondominiumById,
    getAllCondominiums,
} from '../../controllers';

import { authToken, validateShape, validateToken } from '../../middlewares';

import {
    CondominiumRepository,
    SuperAdminRepository,
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

    router.get(
        '/condominiums',
        validateToken(SuperAdminRepository),
        getAllCondominiums,
    );

    router.get(
        '/condominiums/:id',
        validateToken(CondominiumRepository),
        retrieveCondominiumById,
    );

    app.use(router);
};

export default condominiumRoutes;
