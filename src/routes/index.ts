import morgan from 'morgan';
import express, { Application } from 'express';
import superAdminRoutes from './superAdmin';
import condominiumRoutes from './condominium';

const routes = (app: Application) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    superAdminRoutes(app);
    condominiumRoutes(app);
};

export default routes;
