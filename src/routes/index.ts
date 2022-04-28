import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJson from './../configs/swagger.json';
import superAdminRoutes from './superAdmin';
import condominiumRoutes from './condominium';
import categoryRoutes from './category';
import residentsRoutes from './residents';
import serviceRoutes from './service';
import serviceProvidersRoutes from './serviceProvider';
import cors from 'cors';
import options from '../configs/cors.config';

const routes = (app: Application) => {
    app.use(cors(options));
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use(
        '/api_docs',
        swaggerUiExpress.serve,
        swaggerUiExpress.setup(swaggerJson),
    );

    superAdminRoutes(app);
    condominiumRoutes(app);
    residentsRoutes(app);
    serviceProvidersRoutes(app);
    categoryRoutes(app);
    serviceRoutes(app);
};

export default routes;
