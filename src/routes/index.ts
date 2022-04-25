import morgan from 'morgan';
import express, { Application } from 'express';
import superAdminRoutes from './superAdmin';
import condominiumRoutes from './condominium';
import categoryRoutes from './Category';
import residentsRoutes from './residents';
import serviceRoutes from './service';

const routes = (app: Application) => {
    app.use(express.json());
    app.use(morgan('tiny'));

    superAdminRoutes(app);
    condominiumRoutes(app);
    residentsRoutes(app);
    categoryRoutes(app);
    serviceRoutes(app);
};

export default routes;
