import express, { Router } from 'express';
import superAdminRoutes from './superAdmin';

const routes = (app: any) => {
    superAdminRoutes(app);
};

export default routes;
