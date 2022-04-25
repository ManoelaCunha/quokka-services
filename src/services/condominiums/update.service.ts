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
                .json({ message: 'condominiumId key cannot be updated' });
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
            return res.status(400).json({ message: error.driverError.detail });
        }
    }
};

export default updateCondominiumService;
