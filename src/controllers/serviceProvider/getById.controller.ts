import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';

const getServiceProviderById = async (req: Request, res: Response) => {
    const { params } = req;
    const { password, ...serviceProviderWithoutPassword } =
        await new ServiceProviderRepository().findProviderById(params.id);

    return res.status(200).json(serviceProviderWithoutPassword);
};

export default getServiceProviderById;
