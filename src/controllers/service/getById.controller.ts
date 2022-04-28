import { Request, Response } from 'express';
import { ServiceRepository } from '../../repositories';

const getServiceById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const requestedUser = await new ServiceRepository().findServiceById(id);

    if (!requestedUser) {
        return res.status(404).json({ error: 'service not found!' });
    }

    return res.status(200).json(requestedUser);
};

export default getServiceById;
