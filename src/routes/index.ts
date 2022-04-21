import morgan from 'morgan';
import express, { Application } from 'express';
import superAdminRoutes from './superAdmin';
import condominiumRoutes from './condominium';
import categoryRoutes from './Category';

const routes = (app: Application) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    superAdminRoutes(app);
    condominiumRoutes(app);
    categoryRoutes(app);
};

export default routes;
