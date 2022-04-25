import { Application, Router } from 'express';

import {
    createResident,
    deleteResident,
    loginResident,
    getAllResidents,
    retrieveResidentById,
} from '../../controllers';

import {
    authToken,
    validateShape,
    validateToken,
    verifyAdmin,
} from '../../middlewares';

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

    router.get('/residents', verifyAdmin, getAllResidents);

    router.get(
        '/residents/:id',
        validateToken(ResidentRepository),
        retrieveResidentById,
    );

    router.delete(
        '/residents/:id',
        validateToken(ResidentRepository),
        deleteResident,
    );

    app.use(router);
};

export default residentsRoutes;
