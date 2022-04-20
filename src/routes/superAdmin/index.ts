import { Router } from 'express';
import { createSuperAdmin } from '../../controllers';
import updateSuperAdmin from '../../controllers/superAdmin/update.controller';
import { validateShape, verifySuperAdmin } from '../../middlewares';
import { createSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: any) => {
    router.post(
        '/superadmin',
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );

    router.patch(
        '/superadmin/:uuid',
        validateShape(createSuperAdminShape),
        updateSuperAdmin,
    );
    app.use(router);
};

export default superAdminRoutes;
