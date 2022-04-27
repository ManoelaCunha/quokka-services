import { Request, Response } from 'express';
import { ServiceRepository } from '../../repositories';

const deleteService = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;
    const { residentId } = req.decoded;

    const serviceToDelete = await new ServiceRepository().findServiceById(id);

    if (!serviceToDelete) {
        return res.status(404).json({ error: 'service not founded!' });
    }

    if (serviceToDelete.resident.residentId !== residentId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    await new ServiceRepository().deleteService(id);

    return res.status(204).send();
};

export default deleteService;
