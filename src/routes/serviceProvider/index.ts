import { Application, Router } from 'express';

import {
    createServiceProvider,
    loginServiceProvider,
    getAllServiceProviders,
    getServiceProviderById,
    updateProvider,
    deleteServiceProvider,
    updateStatus,
    postServiceProviderInCondominium,
} from '../../controllers';

import {
    authToken,
    validateShape,
    validateToken,
    verifyBody,
    verifyId,
} from '../../middlewares';

import {
    CondominiumRepository,
    ServiceProviderRepository,
    SuperAdminRepository,
} from '../../repositories';

import { createProviderShape, loginProviderShape } from '../../shapes';

import updateProviderShape from '../../shapes/serviceProvider/update.shape';

const router = Router();

const serviceProvidersRoutes = (app: Application) => {
    router.post(
        '/service_providers',
        validateShape(createProviderShape),
        createServiceProvider,
    );

    router.post(
        '/service_providers/login',
        validateShape(loginProviderShape),
        authToken(ServiceProviderRepository),
        loginServiceProvider,
    );

    router.get(
        '/service_providers',
        validateToken(SuperAdminRepository),
        getAllServiceProviders,
    );

    router.get(
        '/service_providers/:id',
        validateToken(ServiceProviderRepository),
        getServiceProviderById,
    );
    
    router.patch(
        '/service_providers/:id',
        verifyBody,
        validateShape(updateProviderShape),
        validateToken(ServiceProviderRepository),
        verifyId,
        updateProvider,
    );

    router.patch(
        '/service_providers/update_status/:id',
        validateToken(CondominiumRepository),
        updateStatus,
    );

    router.delete(
        '/service_providers/:id',
        validateToken(ServiceProviderRepository),
        verifyId,
        deleteServiceProvider,
    );

    router.post(
        '/service_providers/condominium/:id',
        validateToken(ServiceProviderRepository),
        postServiceProviderInCondominium,
    );

    app.use(router);
};

export default serviceProvidersRoutes;
