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
} from '../../controllers';

import {
    authToken,
    validateShape,
    validateToken,
    verifySuperAdmin,
} from '../../middlewares';

import { SuperAdminRepository } from '../../repositories';

const router = Router();

const superAdminRoutes = (app: Application) => {
    router.post(
        '/super_adm',
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
        '/super_adm/:id',
        authToken(SuperAdminRepository),
        retrieveSuperAdminById,
    );

    router.patch(
        '/super_adm/:uuid',
        validateShape(updateSuperAdminShape),
        validateToken(SuperAdminRepository),
        updateSuperAdmin,
    );

    router.delete('/super_adm/:uuid', deleteSuperAdmin);

    app.use(router);
};

export default superAdminRoutes;
