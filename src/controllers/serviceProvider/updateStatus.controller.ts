import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';
import CondominiumServiceProvider from '../../entities/CondominiumServiceProviders';
import { getRepository } from 'typeorm';

const updateStatus = async (req: Request, res: Response) => {
    try {
        const requestedProvider =
            await new ServiceProviderRepository().findById(req.params.id);
        const queryParam = req.query.approved;
        if (!queryParam) {
            return res.status(400).json({ error: "Missing param 'approved'" });
        }
        if (!requestedProvider) {
            return res
                .status(404)
                .json({ error: `Requested user for the id ${req.params.id}` });
        }
        getRepository(CondominiumServiceProvider).create();
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

export default updateStatus;
