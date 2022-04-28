import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';

import ServiceProvider from '../../entities/ServiceProvider';
import CondominiumServiceProvider from '../../entities/CondominiumServiceProviders';

const postServiceProviderInCondominium = async (
    req: Request,
    res: Response,
) => {
    try {
        const condominium = await new CondominiumRepository().findById(
            req.params.id,
        );

        if (!condominium) {
            res.status(404).json({ error: 'condominium not found!' });
        }

        const relation = await getRepository(
            CondominiumServiceProvider,
        ).findOne({
            where: { condominium, serviceProvider: req.decoded },
        });

        if (relation) {
            return res
                .status(409)
                .json({ error: 'Service Provider already in Condominium' });
        }

        const newProviderInCondominium = await getRepository(
            CondominiumServiceProvider,
        ).create({
            condominium,
            serviceProvider: req.decoded as ServiceProvider,
        });

        await getRepository(CondominiumServiceProvider).save(
            newProviderInCondominium,
        );

        return res.status(200).json({ message: 'Request sent successfully' });
    } catch (error) {
        return res.status(400).json({
            error: 'Resquest failed. Please check the parameters and tyr again',
        });
    }
};

export default postServiceProviderInCondominium;
