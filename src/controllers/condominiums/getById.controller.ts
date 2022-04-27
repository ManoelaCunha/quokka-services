import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';
import { getCondominiumByIdService } from '../../services';

const retrieveCondominiumById = async (req: Request, res: Response) => {
    const condominiums = await new CondominiumRepository().findById(
        req.params.id,
    );

    const { trusteePassword, ...condominiumWithouPasword } = condominiums;

    getCondominiumByIdService(condominiumWithouPasword);

    return res.status(200).json({ ...condominiumWithouPasword });
};

export default retrieveCondominiumById;
