import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import { ServiceProviderRepository } from '../../repositories';

import CondominiumServiceProvider from '../../entities/CondominiumServiceProviders';

const updateStatus = async (req: Request, res: Response) => {
    try {
        const serviceProviderId = req.params.id;

        const requestedProvider =
            await new ServiceProviderRepository().findById(serviceProviderId);

        const queryParam: string = req.query.approved as string;

        if (!queryParam) {
            return res.status(400).json({ error: "Missing param 'approved'" });
        }

        if (!requestedProvider) {
            return res
                .status(404)
                .json({ error: `Requested user for the id ${req.params.id}` });
        }

        if (
            queryParam.toLowerCase() !== 'true' &&
            queryParam.toLowerCase() !== 'false'
        ) {
            return res.status(400).json({
                error: `Query param 'approved' only accepts 'true' or 'false' but it received '${queryParam}'`,
            });
        }

        const requestCondominiumServiceProvider =
            requestedProvider.condominiumServiceProviders.find(async (e) => {
                await e.condominium;
                return e.condominium === req.decoded;
            });

        if (!requestCondominiumServiceProvider) {
            return res.status(400).json({
                error: 'Cannot update current service provider status. Please check if this provider currently exists in the requested condominium.',
            });
        }

        const stringToBoolean = queryParam.toLowerCase() === 'true';

        requestCondominiumServiceProvider.isApproved = stringToBoolean;

        await getRepository(CondominiumServiceProvider).save(
            requestedProvider.condominiumServiceProviders,
        );
        if (stringToBoolean) {
            return res.status(200).json({
                message: `Service provider ${requestedProvider.name} has been approved`,
            });
        }
        return res.status(200).json({
            message: `Service Provider ${requestedProvider.name} has been removed from the condominium`,
        });
    } catch (err) {
        if (err instanceof QueryFailedError) {
            return res.status(400).json({
                error: 'Request failed, please check the parameters and try again. ',
            });
        }
        return res.status(400).json({ error: err });
    }
};

export default updateStatus;
