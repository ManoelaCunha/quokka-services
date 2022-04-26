import { Application, Router } from 'express';
import {
    createService,
    getAllServices,
    getServiceById,
    updateService,
} from '../../controllers';
import { validateShape, validateToken } from '../../middlewares';
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

    router.get(
        '/services/:id',
        validateToken(ResidentRepository),
        getServiceById,
    );

    router.patch(
        '/services/:id',
        validateToken(ResidentRepository),
        validateShape(updateServiceShape),
        updateService,
    );

    app.use(router);
};
