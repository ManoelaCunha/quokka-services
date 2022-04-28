import { Request, Response } from 'express';
import { ServiceRepository } from '../../repositories';
import { getByIdService } from '../../services';

const getServiceById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const requestedUser = await new ServiceRepository().findServiceById(id);

    if (!requestedUser) {
        return res.status(404).json({ error: 'service not found!' });
    }

    const resultSchema = await getByIdService(requestedUser);

    return res.status(200).json(resultSchema);
};

export default getServiceById;
