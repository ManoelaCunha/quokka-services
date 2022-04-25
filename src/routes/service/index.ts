import { Application, Router } from 'express';
import { createService } from '../../controllers';
import { validateShape, validateToken } from '../../middlewares';
import { ResidentRepository } from '../../repositories';
import { createServiceShape } from '../../shapes';

const router = Router();

const serviceRoutes = (app: Application) => {
    router.post(
        '/services/:uuid',
        validateToken(ResidentRepository),
        validateShape(createServiceShape),
        createService,
    );

    app.use(router);
};

export default serviceRoutes;
