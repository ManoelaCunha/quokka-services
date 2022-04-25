import { Request, Response } from 'express';
import { SuperAdminRepository } from '../../repositories';

const createServiceProvider = async (req: Request, res: Response) => {
    const { validated } = req;
    const serviceProviderAttributes: any = { ...validated } as any;

    delete serviceProviderAttributes.password;

    try {
        await new SuperAdminRepository().saveSuperAdmin(validated as any);

        return res.status(201).json(serviceProviderAttributes);
    } catch (error) {
        return res.status(400).json({ message: error.driverError.detail });
    }
};

export default createServiceProvider;
