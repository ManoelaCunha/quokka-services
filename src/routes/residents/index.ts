import { Application, Router } from 'express';
import { createResident, loginResident } from '../../controllers';
import { authToken, validateShape } from '../../middlewares';
import { ResidentRepository } from '../../repositories';
import { createResidentShape, loginResidentShape } from '../../shapes';

const router = Router();

const residentsRoutes = (app: Application) => {
    router.post(
        '/residents',
        validateShape(createResidentShape),
        createResident,
    );

    router.post(
        '/residents/login',
        validateShape(loginResidentShape),
        authToken(ResidentRepository),
        loginResident,
    );

    app.use(router);
};

export default residentsRoutes;
