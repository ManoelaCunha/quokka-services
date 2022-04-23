import { Application, Router } from 'express';
import { createResident, retrieveResidentById } from '../../controllers';
import { validateShape, validateToken } from '../../middlewares';
import { ResidentRepository } from '../../repositories';
import { createResidentShape } from '../../shapes';

const router = Router();

const residentsRoutes = (app: Application) => {
    router.post(
        '/residents',
        validateShape(createResidentShape),
        createResident,
    );

    router.get(
        '/residents/:id',
        validateToken(ResidentRepository),
        retrieveResidentById,
    );

    app.use(router);
};

export default residentsRoutes;
