import { Request, Response } from 'express';
import ServiceProvider from '../../entities/ServiceProvider';
import { ServiceProviderRepository } from '../../repositories';

const createServiceProvider = async (req: Request, res: Response) => {
    const { validated } = req;

    try {
        const serviceProviderCreate =
            await new ServiceProviderRepository().saveProvider(
                validated as ServiceProvider,
            );

        const { password, ...serviceProviderReturn } = serviceProviderCreate;

        return res.status(201).json(serviceProviderReturn);
    } catch (error) {
        return res.status(400).json({ error: error.driverError.detail });
    }
};

export default createServiceProvider;
