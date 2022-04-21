import { Application, Router } from 'express';
import { createCategory } from '../../controllers';

import {
    authToken,
    validateShape,
    validateToken,
    verifySuperAdmin,
} from '../../middlewares';

import { CategoryRepository } from '../../repositories';

const router = Router();

const categoryRoutes = (app: Application) => {
    router.post('/categories', createCategory);

    app.use(router);
};

export default categoryRoutes;
