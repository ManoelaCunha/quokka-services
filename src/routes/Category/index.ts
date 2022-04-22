import { Application, Router } from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
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

    router.delete(
        '/categories/:id',
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        deleteCategory,
    );

    app.use(router);
};

export default categoryRoutes;
