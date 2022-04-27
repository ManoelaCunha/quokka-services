import { Application, Router } from 'express';
import {
    createService,
    getAllServices,
    getServiceById,
    deleteService,
    updateService,
    updateServiceStatus,
} from '../../controllers';
import {
    validateShape,
    validateToken,
    verifyBody,
    verifyId,
} from '../../middlewares';
import {
    CondominiumRepository,
    ResidentRepository,
    ServiceProviderRepository,
} from '../../repositories';
import { createServiceShape, updateServiceShape } from '../../shapes';

const router = Router();

const serviceRoutes = (app: Application) => {
    router.post(
        '/services/:uuid',
        validateToken(ResidentRepository),
        validateShape(createServiceShape),
        createService,
    );

    router.get(
        '/services',
        validateToken(ServiceProviderRepository),
        getAllServices,
    );

    router.get('/services/:id', getServiceById);

    router.delete(
        '/services/:id',
        validateToken(ResidentRepository),
        deleteService,
    );

    router.patch(
        '/services/:id',
        verifyBody,
        validateToken(ResidentRepository),
        validateShape(updateServiceShape),
        updateService,
    );

    router.patch(
        '/services/update_status/:id',
        verifyBody,
        validateToken(ServiceProviderRepository),
        updateServiceStatus,
    );

    app.use(router);
};

export default serviceRoutes;
