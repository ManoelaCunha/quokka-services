import { Application, Router } from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
} from '../../controllers';

import { validateToken, verifySuperAdmin } from '../../middlewares';

import { SuperAdminRepository } from '../../repositories';

const router = Router();

const categoryRoutes = (app: Application) => {
    router.post(
        '/categories',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        createCategory,
    );

    router.get(
        '/categories',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        getAllCategories,
    );

    router.get(
        '/categories/:id',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        getCategoryById,
    );

    app.use(router);
};

export default categoryRoutes;
