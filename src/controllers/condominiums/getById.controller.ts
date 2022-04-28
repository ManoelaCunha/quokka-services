import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';
import { getCondominiumByIdService } from '../../services';

const retrieveCondominiumById = async (req: Request, res: Response) => {
    const condominium = await new CondominiumRepository().findById(
        req.params.id,
    );

    const { trusteePassword, ...condominiumWithouPasword } = condominium;

    getCondominiumByIdService(condominiumWithouPasword);

    return res.status(200).json({ ...condominiumWithouPasword });
};

export default retrieveCondominiumById;
