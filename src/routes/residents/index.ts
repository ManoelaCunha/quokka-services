import { Application, Router } from 'express';

import {
    createResident,
    deleteResident,
    loginResident,
    getAllResidents,
    retrieveResidentById,
    updateResident,
} from '../../controllers';

import {
    authToken,
    validateShape,
    validateToken,
    verifyAdmin,
} from '../../middlewares';

import { ResidentRepository, CondominiumRepository } from '../../repositories';

import { createResidentShape, loginResidentShape } from '../../shapes';

const router = Router();

const residentsRoutes = (app: Application) => {
    router.post(
        '/residents',
        validateShape(createResidentShape),
        validateToken(CondominiumRepository),
        createResident,
    );

    router.post(
        '/residents/login',
        validateShape(loginResidentShape),
        authToken(ResidentRepository),
        loginResident,
    );

    router.get(
        '/residents',
        validateToken(CondominiumRepository),
        verifyAdmin,
        getAllResidents,
    );

    router.get(
        '/residents/:id',
        validateToken(ResidentRepository),
        retrieveResidentById,
    );

    router.patch(
        '/residents/:id',
        validateToken(ResidentRepository || CondominiumRepository),
        updateResident,
    );

    router.delete(
        '/residents/:id',
        validateToken(CondominiumRepository),
        deleteResident,
    );

    app.use(router);
};

export default residentsRoutes;
