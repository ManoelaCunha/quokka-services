import morgan from 'morgan';
import express, { Application } from 'express';
import superAdminRoutes from './superAdmin';

const routes = (app: Application) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    superAdminRoutes(app);
};

export default routes;
