import { Application, Router } from 'express';
import { createResident } from '../../controllers';
import { validateShape } from '../../middlewares';
import { createResidentShape } from '../../shapes';

const router = Router();

const residentsRoutes = (app: Application) => {
    router.post(
        '/residents',
        validateShape(createResidentShape),
        createResident,
    );

    app.use(router);
};

export default residentsRoutes;
