import { Application, Router } from 'express';
import { createSuperAdmin, deleteSuperAdmin } from '../../controllers';
import {
    validateShape,
    validateToken,
    verifySuperAdmin,
} from '../../middlewares';
import { createSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: Application) => {
    router.post(
        '/superadmin',
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );
    router.delete('/super_adm/:uuid', deleteSuperAdmin);
    app.use(router);
};

export default superAdminRoutes;
