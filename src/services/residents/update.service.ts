import Resident from '../../entities/Resident';

import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { CondominiumRepository, ResidentRepository } from '../../repositories';

const updateResidentService = async (
    req: Request,
    res: Response,
): Promise<Resident | Response> => {
    try {
        const { id } = req.params;
        console.log(id);

        const auth = req.query.auth;
        console.log(auth);

        const { condominiumId, residentId }: any = req.decoded;
        console.log(req.decoded);

        const data = req.body;
        console.log(data);

        if ('residentId' in data) {
            return res
                .status(401)
                .json({ message: 'residentId key cannot be updated' });
        }

        if ('isAuth' in data && residentId) {
            return res
                .status(401)
                .json({ message: 'isAuth key cannot be updated' });
        }

        // if (id !== residentId) {
        //     return res.status(401).json({ message: 'Missing permission' });
        // }

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
