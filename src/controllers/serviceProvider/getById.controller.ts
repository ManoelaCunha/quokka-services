import Service from '../../entities/Service';

import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';

const getServiceProviderById = async (req: Request, res: Response) => {
    const { params } = req;

    try {
        const serviceProvider = await new ServiceProviderRepository().findById(
            params.id as string,
        );

        const data = [];
        await Promise.all(
            serviceProvider.condominiumServiceProviders.map(async (item) => {
                const { isApproved } = item;
                const {
                    condominiumId,
                    condominiumName,
                    zipCode,
                    district,
                    street,
                    number,
                    trusteeName,
                    trusteeEmail,
                } = await item.condominium;

                const dataToReturn = {
                    isApproved: isApproved,
                    condominiumId: condominiumId,
                    condominiumName: condominiumName,
                    zipCode: zipCode,
                    district: district,
                    street: street,
                    number: number,
                    trusteeName: trusteeName,
                    trusteeEmail: trusteeEmail,
                };

                data.push(dataToReturn);
            }),
        );
        const services = await serviceProvider.services;

        const servicesSchema: Partial<Service | {}>[] = [];

        services.forEach((item: Service) => {
            const { resident, serviceProvider, ...rest } = item;

            const category = rest.category.name;

            servicesSchema.push({ ...rest, category });
        });

        const {
            password,
            condominiumServiceProviders,
            __services__,
            __has_services__,
            ...rest
        } = Object(serviceProvider);

        const resultSchema = {
            ...rest,
            condominiums: data,
            services: servicesSchema,
        };

        return res.status(200).json(resultSchema);
    } catch (error) {
        return res.status(404).json({ error: 'Service Provider not found' });
    }
};

export default getServiceProviderById;
