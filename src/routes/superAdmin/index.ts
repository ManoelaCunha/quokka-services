import { Application, Router } from 'express';

import {
    createSuperAdminShape,
    loginSuperAdminShape,
    updateSuperAdminShape,
} from '../../shapes';

import {
    createSuperAdmin,
    loginSuperAdmin,
    retrieveSuperAdminById,
    updateSuperAdmin,
    deleteSuperAdmin,
    getAllSuperAdmin,
} from '../../controllers';

import {
    authToken,
    validateShape,
    validateToken,
    verifyId,
    verifyBody,
    verifySuperAdmin,
} from '../../middlewares';

import { SuperAdminRepository } from '../../repositories';

const router = Router();

const superAdminRoutes = (app: Application) => {
    router.post(
        '/super_adm',
        validateToken(SuperAdminRepository),
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );

    router.post(
        '/super_adm/login',
        validateShape(loginSuperAdminShape),
        authToken(SuperAdminRepository),
        loginSuperAdmin,
    );

    router.get(
        '/super_adm',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        getAllSuperAdmin,
    );

    router.get(
        '/super_adm/:id',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        verifyId,
        retrieveSuperAdminById,
    );

    router.patch(
        '/super_adm/:id',
        verifyBody,
        validateShape(updateSuperAdminShape),
        validateToken(SuperAdminRepository),
        verifyId,
        updateSuperAdmin,
    );

    router.delete(
        '/super_adm/:id',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        verifyId,
        deleteSuperAdmin,
    );

    app.use(router);
};

export default superAdminRoutes;
