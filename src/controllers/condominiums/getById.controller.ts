import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';

const retrieveCondominiumById = async (req: Request, res: Response) => {
    const condominiums = await new CondominiumRepository().findById(
        req.params.id,
    );

    const {
        trusteePassword,
        residents,
        condominiumServiceProviders,
        ...condominiumWithouPasword
    } = condominiums;

    return res.status(200).json({
        ...condominiumWithouPasword,
        residents,
        serviceProviders: condominiumServiceProviders,
    });
};

export default retrieveCondominiumById;
