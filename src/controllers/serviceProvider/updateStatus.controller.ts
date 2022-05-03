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
            return res.status(404).json({
                error: `serviceProviderId ${req.params.id} not found!`,
            });
        }

        if (
            queryParam.toLowerCase() !== 'true' &&
            queryParam.toLowerCase() !== 'false'
        ) {
            return res.status(400).json({
                error: `Query param 'approved' only accepts 'true' or 'false' but it received '${queryParam}'`,
            });
        }

        const condominiumServiceProviderId = [];

        await Promise.all(
            requestedProvider.condominiumServiceProviders.map(async (e) => {
                const { condominiumId } = await e.condominium;

                if (condominiumId === req.decoded.condominiumId) {
                    const { condoServiceProvidersId } = await e;

                    condominiumServiceProviderId.push(condoServiceProvidersId);
                }
            }),
        );

        const stringToBoolean = queryParam.toLowerCase() === 'true';

        await getRepository(CondominiumServiceProvider).update(
            condominiumServiceProviderId[0],
            { isApproved: stringToBoolean },
        );

        return res.status(200).json({
            message: `Service Provider '${requestedProvider.name}' status has been updated to '${stringToBoolean}'`,
        });
    } catch (err) {
        if (err instanceof QueryFailedError) {
            return res.status(400).json({
                error: 'Request failed, please check the parameters and try again. ',
            });
        }

        return res.status(400).json({
            error: 'Cannot update current service provider status. Please check if this provider currently exists in the requested condominium.',
        });
    }
};

export default updateStatus;
