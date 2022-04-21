import { Application, Router } from 'express';
import { createCategory, getAllCategories } from '../../controllers';

import { validateToken, verifySuperAdmin } from '../../middlewares';

import { CategoryRepository } from '../../repositories';

const router = Router();

const categoryRoutes = (app: Application) => {
    router.post(
        '/categories',
        validateToken(CategoryRepository),
        verifySuperAdmin,
        createCategory,
    );

    router.get(
        '/categories',
        validateToken(CategoryRepository),
        verifySuperAdmin,
        getAllCategories,
    );

    app.use(router);
};

export default categoryRoutes;
