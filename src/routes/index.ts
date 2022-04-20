import morgan from 'morgan';
import express from 'express';
import superAdminRoutes from './superAdmin';

const routes = (app: any) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    superAdminRoutes(app);
};

export default routes;
