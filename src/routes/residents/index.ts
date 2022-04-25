import { Application, Router } from 'express';
import { createResident, getAllResidents } from '../../controllers';
import { validateShape, verifyAdmin } from '../../middlewares';
import { createResidentShape } from '../../shapes';

const router = Router();

const residentsRoutes = (app: Application) => {
    router.post(
        '/residents',
        validateShape(createResidentShape),
        createResident,
    );

    router.get('/residents', getAllResidents);

    app.use(router);
};

export default residentsRoutes;
