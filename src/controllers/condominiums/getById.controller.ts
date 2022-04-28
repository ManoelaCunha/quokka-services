import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';
import { getCondominiumByIdService } from '../../services';

const retrieveCondominiumById = async (req: Request, res: Response) => {
    let condominium = await new CondominiumRepository().findById(req.params.id);

    const { trusteePassword, ...condominiumWithouPasword } = condominium;
    await getCondominiumByIdService(condominiumWithouPasword);

    const servicesProviders = await getCondominiumByIdService(
        condominiumWithouPasword,
    );

    condominiumWithouPasword['servicesProviders'] = servicesProviders;
    delete condominiumWithouPasword.condominiumServiceProviders;

    return res.status(200).json({ ...condominiumWithouPasword });
};

export default retrieveCondominiumById;
