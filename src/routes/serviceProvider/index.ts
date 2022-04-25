import { Application, Router } from 'express';
import {
    createServiceProvider,
    loginServiceProvider,
    getAllServiceProviders,
} from '../../controllers';
import { authToken, validateShape, validateToken } from '../../middlewares';
import { ServiceProviderRepository } from '../../repositories';
import { createProviderShape, loginProviderShape } from '../../shapes';

const router = Router();

const serviceProvidersRoutes = (app: Application) => {
    router.post(
        '/service_providers',
        validateShape(createProviderShape),
        createServiceProvider,
    );

    router.post(
        '/service_providers/login',
        validateShape(loginProviderShape),
        authToken(ServiceProviderRepository),
        loginServiceProvider,
    );

    router.get(
        '/service_providers',
        validateToken(ServiceProviderRepository),
        getAllServiceProviders,
    );

    app.use(router);
};

export default serviceProvidersRoutes;
