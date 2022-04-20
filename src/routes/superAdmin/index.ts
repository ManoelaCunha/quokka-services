import { Router } from 'express';
import { createSuperAdmin, retrieveSuperAdminById } from '../../controllers';
import { validateShape } from '../../middlewares';
import authToken from '../../middlewares/authToken.middleware';
import { SuperAdminRepository } from '../../repositories';
import { createSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: any) => {
    router.post(
        '/superadmin',
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );

    router.get(
        '/super_adm/:id',
        authToken(SuperAdminRepository),
        retrieveSuperAdminById,
    );
    app.use(router);
};

export default superAdminRoutes;
