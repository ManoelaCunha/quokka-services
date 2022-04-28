import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';

const deleteServiceProvider = async (req: Request, res: Response) => {
    const { params } = req;

    await new ServiceProviderRepository().deleteProvider(params.id);

    return res.status(204).json();
};

export default deleteServiceProvider;
