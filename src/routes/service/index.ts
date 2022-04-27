import { Application, Router } from 'express';
import {
    createService,
    getAllServices,
    getServiceById,
    deleteService,
    updateService,
} from '../../controllers';
import { validateShape, validateToken, verifyId } from '../../middlewares';
import {
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
        validateToken(ResidentRepository),
        validateShape(updateServiceShape),
        updateService,
    );

    app.use(router);
};

export default serviceRoutes;
