import { Request, Response } from 'express';
import ServiceProvider from '../../entities/ServiceProvider';
import CondominiumServiceProvider from '../../entities/CondominiumServiceProviders';
import { CondominiumRepository } from '../../repositories';
import { getRepository } from 'typeorm';

const postServiceProviderInCondominium = async (
    req: Request,
    res: Response,
) => {
    const condominium = await new CondominiumRepository().findById(
        req.params.id,
    );

    const newProviderInCondominium = await getRepository(
        CondominiumServiceProvider,
    ).create({ condominium, serviceProvider: req.decoded as ServiceProvider });

    await getRepository(CondominiumServiceProvider).save(
        newProviderInCondominium,
    );

    return res.status(200).json({ message: 'Request sent successfully' });
};

export default postServiceProviderInCondominium;
