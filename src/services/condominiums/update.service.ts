import Condominium from '../../entities/Condominium';

import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';

const updateCondominiumService = async (
    req: Request,
    res: Response,
): Promise<Condominium | Response> => {
    try {
        const { id } = req.params;

        const { validated } = req;

        if ('condominiumId' in validated) {
            return res
                .status(401)
                .json({ error: 'condominiumId key cannot be updated' });

        }

        if (Object.keys(req.body).length === 0) {
            return res
                .status(400)
                .json({ error: 'This route needs request body!' });

        }

        await new CondominiumRepository().updateCondominium(
            id,
            validated as Partial<Condominium>,
        );

        const updateCondominium = await new CondominiumRepository().findById(
            id,
        );

        return updateCondominium as Condominium;
    } catch (error: any) {
        if (error instanceof QueryFailedError) {

            return res.status(400).json({ error: error.driverError });

        }
    }
};

export default updateCondominiumService;
