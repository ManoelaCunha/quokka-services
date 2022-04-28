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
    verifyBody,
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
        '/residents/login',
        validateShape(loginResidentShape),
        authToken(ResidentRepository),
        loginResident,
    );

    router.post(
        '/residents/:condominiumId',
        validateShape(createResidentShape),
        createResident,
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
        verifyId,
        retrieveResidentById,
    );

    router.patch(
        '/residents/:id',
        verifyBody,
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
