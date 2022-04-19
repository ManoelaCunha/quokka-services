import express, { Router } from 'express';
import superAdminRoutes from './superAdmin';

const routes = (app: any) => {
    app.use(express.json());
    superAdminRoutes(app);
};

export default routes;
