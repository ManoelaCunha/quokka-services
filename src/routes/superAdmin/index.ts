import { Router } from 'express';

import { createSuperAdmin, retrieveSuperAdminById } from '../../controllers';
import { validateShape, verifySuperAdmin } from '../../middlewares';
import { SuperAdminRepository } from '../../repositories';
import { createSuperAdminShape } from '../../shapes';

import authToken from '../../middlewares/authToken.middleware';
import updateSuperAdmin from '../../controllers/superAdmin/update.controller';

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

    router.patch(
        '/superadmin/:uuid',
        validateShape(createSuperAdminShape),
        updateSuperAdmin,
    );
      
    app.use(router);
};

export default superAdminRoutes;
