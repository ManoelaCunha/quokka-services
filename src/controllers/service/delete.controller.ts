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
        return res.status(404).json({ error: 'service not found!' });
    }

    if (
        serviceToDelete.status === 'pending' ||
        serviceToDelete.status === 'done'
    ) {
        return res.status(401).json({
            error: 'Not allowed to delete a service with status pending or done',
        });
    }

    if (serviceToDelete.resident.residentId !== residentId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    await new ServiceRepository().deleteService(id);

    return res.status(204).send();
};

export default deleteService;
