import { Application, Router } from 'express';
import { createServiceProvider } from '../../controllers';
import { validateShape } from '../../middlewares';
import { createProviderShape } from '../../shapes';

const router = Router();

const serviceProvidersRouter = (app: Application) => {
    router.post(
        '/service_providers',
        validateShape(createProviderShape),
        createServiceProvider,
    );

    app.use(router);
};

export default serviceProvidersRouter;
