import Resident from '../../entities/Resident';
import Condominium from '../../entities/Condominium';

import { Request, Response } from 'express';
import { CondominiumRepository, ResidentRepository } from '../../repositories';

const createResidentService = async (req: Request, res: Response) => {
    try {
        const { condominiumId } = req.params;

        const condominium = await new CondominiumRepository().findById(
            condominiumId,
        );

        const {
            trusteeCpf,
            trusteePassword,
            residents,
            condominiumServiceProviders,
            ...condominiumInfo
        } = condominium as Condominium;

        const { validated } = req;

        const newResident = await new ResidentRepository().saveResident(
            validated as Resident,
            condominiumInfo as Condominium,
        );

        return newResident;
    } catch (error) {
        return res.status(400).json({ error: error.driverError.detail });
    }
};

export default createResidentService;
