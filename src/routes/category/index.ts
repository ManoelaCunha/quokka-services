import { Application, Router } from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
} from '../../controllers';

import { validateToken, verifyBody, verifySuperAdmin } from '../../middlewares';

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

    router.patch(
        '/categories/:id',
        verifyBody,
        validateToken(SuperAdminRepository),
        verifySuperAdmin,
        updateCategory,
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
