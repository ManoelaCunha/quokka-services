import express, { Application, Router } from 'express';
import superAdminRoutes from './superAdmin';

const routes = (app: Application) => {
    superAdminRoutes(app);
};

export default routes;
