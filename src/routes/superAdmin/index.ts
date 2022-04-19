import { Router } from 'express';
import { createSuperAdmin } from '../../controllers';
import { validateShape } from '../../middlewares';
import { createSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: any) => {
    router.post(
        '/superadmin',
        validateShape(createSuperAdminShape),
        createSuperAdmin,
    );
    app.use(router);
};

export default superAdminRoutes;
