import { Request, Response } from 'express';
import { ServiceRepository } from '../../repositories';

const getServiceById = async (req: Request, res: Response) => {
    const requestedUser = await new ServiceRepository().findServiceById(
        req.params.id,
    );
    if (!requestedUser) {
        return res.status(404).json({ error: 'Requested category not found!' });
    }
    return res.status(200).json(requestedUser);
};

export default getServiceById;
