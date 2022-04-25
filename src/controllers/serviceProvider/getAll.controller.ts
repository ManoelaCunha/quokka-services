import { Request, Response } from 'express';
import ServiceProvider from '../../entities/ServiceProvider';
import { ServiceProviderRepository } from '../../repositories';

const getAllServiceProviders = async (
    _: Request,
    res: Response,
): Promise<Response> => {
    const serviceProviders =
        await new ServiceProviderRepository().findProvider();
    const serviceProvidersWithoutPassword: Array<Partial<ServiceProvider>> = [];

    serviceProviders.forEach((serviceProvider: ServiceProvider) => {
        const { password, ...serviceProtviderAttributes } = serviceProvider;

        serviceProvidersWithoutPassword.push(serviceProtviderAttributes);
    });

    return res.status(200).json(serviceProvidersWithoutPassword);
};

export default getAllServiceProviders;
