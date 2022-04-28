import { Router, Application } from 'express';

import {
    createCondomonium,
    loginCondominium,
    retrieveCondominiumById,
    getAllCondominiums,
    deleteCondominium,
} from '../../controllers';

import updateCondominium from '../../controllers/condominiums/update.controller';

import {
    authToken,
    validateShape,
    validateToken,
    verifyBody,
    verifyId,
    verifySuperAdmin,
} from '../../middlewares';

import {
    CondominiumRepository,
    SuperAdminRepository,
} from '../../repositories';

import {
    createCondominium as createCondominiumShape,
    loginCondominium as loginCondominiumShape,
    updateCondominium as updateCondominiumShape,
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

    router.get('/condominiums', getAllCondominiums);

    router.get(
        '/condominiums/:id',
        validateToken(CondominiumRepository),
        verifyId,
        retrieveCondominiumById,
    );

    router.patch(
        '/condominiums/:id',
        verifyBody,
        validateShape(updateCondominiumShape),
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        updateCondominium,
    );

    router.delete(
        '/condominiums/:id',
        validateToken(SuperAdminRepository),
        deleteCondominium,
    );

    app.use(router);
};

export default condominiumRoutes;
