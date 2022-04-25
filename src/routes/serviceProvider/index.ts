import { Application, Router } from 'express';
import { createServiceProvider, loginServiceProvider } from '../../controllers';
import { authToken, validateShape } from '../../middlewares';
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

    app.use(router);
};

export default serviceProvidersRoutes;
