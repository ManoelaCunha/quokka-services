import { Request, Response } from 'express';
import ServiceProvider from '../../entities/ServiceProvider';
import { ServiceProviderRepository } from '../../repositories';

const createServiceProvider = async (req: Request, res: Response) => {
    const { validated } = req;
    const serviceProviderAttributes: ServiceProvider = {
        ...validated,
    } as ServiceProvider;

    delete serviceProviderAttributes.password;

    try {
        await new ServiceProviderRepository().saveProvider(
            validated as ServiceProvider,
        );

        return res.status(201).json(serviceProviderAttributes);
    } catch (error) {
        return res.status(400).json({ message: error.driverError.detail });
    }
};

export default createServiceProvider;
