import { Application, Router } from 'express';
import {
    createService,
    getAllServices,
    getServiceById,
    deleteService,
} from '../../controllers';
import { validateShape, validateToken } from '../../middlewares';
import {
    ResidentRepository,
    ServiceProviderRepository,
} from '../../repositories';
import { createServiceShape } from '../../shapes';

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
        // validateToken(ServiceProviderRepository),
        getAllServices,
    );

    router.get(
        '/services/:id',
        validateToken(ResidentRepository),
        getServiceById,
    );

    router.delete(
        '/services/:id',
        validateToken(ResidentRepository),
        deleteService,
    );

    app.use(router);
};

export default serviceRoutes;
