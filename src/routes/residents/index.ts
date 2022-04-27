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
    verifyId,
} from '../../middlewares';

import { ResidentRepository, CondominiumRepository } from '../../repositories';

import {
    createResidentShape,
    loginResidentShape,
    updateResidentShape,
} from '../../shapes';

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
        validateShape(updateResidentShape),
        validateToken(ResidentRepository),
        verifyId,
        updateResident,
    );

    router.patch(
        '/residents/update_status/:id',
        validateToken(CondominiumRepository),
        verifyAdmin,
        updateResident,
    );

    router.delete(
        '/residents/:id',
        validateToken(ResidentRepository),
        verifyId,
        deleteResident,
    );

    app.use(router);
};

export default residentsRoutes;
