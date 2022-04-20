import { Router, Application } from 'express';

const router = Router();

const condominiumRoutes = (app: Application) => {
    router.post('/condominiums', (req, res) => {
        return res.json('condominiums');
    });

    app.use(router);
};

export default condominiumRoutes;
