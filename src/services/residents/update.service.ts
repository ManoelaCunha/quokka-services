import Resident from '../../entities/Resident';
import Condominium from '../../entities/Condominium';

import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { ResidentRepository } from '../../repositories';

const updateResidentService = async (
    req: Request,
    res: Response,
): Promise<Resident | Response> => {
    try {
        const { id } = req.params;

        const auth = req.query.auth as string;

        const { condominiumId } = req.decoded as Condominium;

        if (condominiumId) {
            if (auth !== 'true' && auth !== 'false') {
                return res.status(400).json({
                    error: `Query param 'auth' only accepts 'true' or 'false' but it received '${auth}'`,
                });
            }

            const data = { isAuth: auth === 'true' ? true : false };

            await new ResidentRepository().updateResident(
                id,
                data as Partial<Resident>,
            );

            const updateResidentStatus =
                await new ResidentRepository().findById(id);

            if (!updateResidentStatus) {
                return res
                    .status(404)
                    .json({ error: `residentId ${req.params.id} not found!` });
            }

            if (Object.keys(req.body).length !== 0) {
                return res
                    .status(401)
                    .json({ error: 'This route has no request body!' });
            }

            return updateResidentStatus as Resident;
        }

        const { residentId } = req.decoded as Resident;

        const data = req.validated as Partial<Resident>;

        if ('residentId' in data || 'isAuth' in data || (auth && residentId)) {
            return res.status(401).json({
                error: "Unauthorized update on 'isAuth/residentId' key",
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res
                .status(400)
                .json({ error: 'This route needs request body!' });
        }

        await new ResidentRepository().updateResident(
            id,
            data as Partial<Resident>,
        );

        const updateResident = await new ResidentRepository().findById(id);

        return updateResident as Resident;
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).json({ error: error.driverError });
        }
    }
};

export default updateResidentService;
