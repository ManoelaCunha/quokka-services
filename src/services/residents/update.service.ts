import Resident from '../../entities/Resident';

import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { CondominiumRepository, ResidentRepository } from '../../repositories';
import Condominium from '../../entities/Condominium';

const updateResidentService = async (
    req: Request,
    res: Response,
): Promise<Resident | Response> => {
    try {
        const { id } = req.params;
        const { condominiumId } = req.decoded as Condominium;
        const { residentId } = req.decoded as Resident;

        const data = req.body;
        const auth = req.query.auth;

        if ('residentId' in data) {
            return res
                .status(401)
                .json({ message: "Unauthorized update on 'residentId' key" });
        }

        if ('isAuth' in data && residentId) {
            return res
                .status(401)
                .json({ message: "Unauthorized update on 'isAuth' key" });
        }

        const condominium = await new CondominiumRepository().findById(
            condominiumId,
        );

        if (condominium && auth) {
            data.isAuth = auth;
        }

        await new ResidentRepository().updateResident(
            id,
            data as Partial<Resident>,
        );

        const updateResident = await new ResidentRepository().findById(id);

        return updateResident as Resident;
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ message: error.driverError.detail });
        }
    }
};

export default updateResidentService;
