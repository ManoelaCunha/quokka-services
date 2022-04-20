import { Router } from 'express';
import { createSuperAdmin, loginSuperAdminController } from '../../controllers';
import { authToken, validateShape } from '../../middlewares';
import { SuperAdminRepository } from '../../repositories';
import { createSuperAdminShape, loginSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: any) => {
    router.post(
        '/super_adm',
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );

    router.post(
        '/super_adm/login',
        validateShape(loginSuperAdminShape),
        authToken(SuperAdminRepository),
        loginSuperAdminController,
    );

    app.use(router);
};

export default superAdminRoutes;
