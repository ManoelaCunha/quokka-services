import { Router } from 'express';
import { validateShape } from '../../middlewares';
import { createSuperAdminShape } from '../../shapes';

const router = Router();

const superAdminRoutes = (app: any) => {
    router.post('/superAdmin', validateShape(createSuperAdminShape), () => 0);
    app.use(router);
};

export default superAdminRoutes;
