import { Request, Response } from 'express';
import { ServiceRepository } from '../../repositories';
import { getByIdService } from '../../services';

const getServiceById = async (req: Request, res: Response) => {
    const requestedUser = await new ServiceRepository().findServiceById(
        req.params.id,
    );
    if (!requestedUser) {
        return res.status(404).json({ error: 'Requested category not found!' });
    }

    const resultSchema = await getByIdService(requestedUser);

    return res.status(200).json(resultSchema);
};

export default getServiceById;
