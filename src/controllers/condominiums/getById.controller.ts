import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';

const retrieveCondominiumById = async (req: Request, res: Response) => {
    const condominiums = await new CondominiumRepository().findCondominiumById(
        req.params.id,
    );

    const { trusteePassword, ...condominiumWithouPasword } = condominiums;

    return res.status(200).json(condominiumWithouPasword);
};

export default retrieveCondominiumById;