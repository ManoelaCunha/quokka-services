import { Application, Router } from 'express';
import {
    createServiceProvider,
    getAllServiceProviders,
} from '../../controllers';
import { validateShape, validateToken } from '../../middlewares';
import { ServiceProviderRepository } from '../../repositories';
import { createProviderShape } from '../../shapes';

const router = Router();

const serviceProvidersRoutes = (app: Application) => {
    router.post(
        '/service_providers',
        validateShape(createProviderShape),
        createServiceProvider,
    );

    router.get(
        '/service_providers',
        validateToken(ServiceProviderRepository),
        getAllServiceProviders,
    );

    app.use(router);
};

export default serviceProvidersRoutes;
