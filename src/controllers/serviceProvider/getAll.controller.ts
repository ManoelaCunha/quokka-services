import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';

import ServiceProvider from '../../entities/ServiceProvider';

const getAllServiceProviders = async (
    _: Request,
    res: Response,
): Promise<Response> => {
    const serviceProviders =
        await new ServiceProviderRepository().findAllProviders();

    const serviceProvidersWithoutPassword: Array<Partial<ServiceProvider>> = [];

    serviceProviders.forEach((serviceProvider: ServiceProvider) => {
        const {
            password,
            //condominiumServiceProviders,
            ...serviceProtviderAttributes
        } = serviceProvider;

        const teste = serviceProvider.condominiumServiceProviders.map(
            async (obj, i) => {
                console.log(obj);
                console.log(i);
                console.log(serviceProvider.condominiumServiceProviders[i]);
                return await obj.condominium;

                //const approved = await key.isApproved;

                // serviceProvider.condominiumServiceProviders['condominiumName'] =
                //     condoName.condominiumName;
            },
        );

        //console.log(teste);

        serviceProvidersWithoutPassword.push(serviceProtviderAttributes);
    });

    return res.status(200).json(serviceProvidersWithoutPassword);
};

export default getAllServiceProviders;
