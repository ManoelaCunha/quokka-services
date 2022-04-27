import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CondominiumServiceProvider from '../../entities/CondominiumServiceProviders';
import { ServiceProviderRepository } from '../../repositories';

const updateStatus = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const requestedProvider =
            await new ServiceProviderRepository().findById(userId);
        const queryParam: string = req.query.approved as string;
        if (!queryParam) {
            return res.status(400).json({ error: "Missing param 'approved'" });
        }
        if (!requestedProvider) {
            return res
                .status(404)
                .json({ error: `Requested user for the id ${req.params.id}` });
        }
        const stringToBoolean = queryParam.toLowerCase() === 'true';
        await getRepository(CondominiumServiceProvider).update(
            requestedProvider.condominiumServiceProviders[0]
                .condoServiceProvidersId,
            { isApproved: stringToBoolean },
        );

        const dataToReturn = await new ServiceProviderRepository().findById(
            userId,
        );

        return res.status(201).json(dataToReturn);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

export default updateStatus;
