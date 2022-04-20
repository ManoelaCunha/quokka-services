import { Router } from 'express';
import { createSuperAdmin, loginSuperAdmin } from '../../controllers';
import { validateShape } from '../../middlewares';
import authToken from '../../middlewares/authToken.middleware';
import { SuperAdminRepository } from '../../repositories';
import { createSuperAdminShape, loginSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: any) => {
    router.post(
        '/superadmin',
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );

    router.post(
        '/super_adm/login',
        validateShape(loginSuperAdminShape),
        authToken(SuperAdminRepository),
        loginSuperAdmin,
    );

    app.use(router);
};

export default superAdminRoutes;
