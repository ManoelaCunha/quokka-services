import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import CondominiumServiceProvider from '../../entities/CondominiumServiceProviders';
import { ServiceProviderRepository } from '../../repositories';

const updateStatus = async (req: Request, res: Response) => {
    try {
        const serviceProviderId = req.params.id;

        const requestedProvider =
            await new ServiceProviderRepository().findById(serviceProviderId);

        console.log(requestedProvider);

        const queryParam: string = req.query.approved as string;
        // console.log(requestedProvider.condominiumServiceProviders.length);
        // console.log(requestedProvider.condominiumServiceProviders);

        if (requestedProvider.condominiumServiceProviders.length > 1) {
            return res.status(401).json({
                error: 'Cannot work in more than 1 condominium at a time',
            });
        }

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
                const { condominiumId } = await e.condominium;
                return condominiumId === e.condominium.condominiumId;
            });

        if (!requestCondominiumServiceProvider) {
            return res.status(400).json({
                error: 'Cannot update current service provider status. Please check if this provider currently exists in the requested condominium.',
            });
        }
        const stringToBoolean = queryParam.toLowerCase() === 'true';
        await getRepository(CondominiumServiceProvider).update(
            requestCondominiumServiceProvider.condoServiceProvidersId,
            { isApproved: stringToBoolean },
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
