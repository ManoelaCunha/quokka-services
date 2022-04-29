import Resident from '../../entities/Resident';
import Condominium from '../../entities/Condominium';

import { Request, Response } from 'express';
import { ResidentRepository } from '../../repositories';

const getAllResidents = async (req: Request, res: Response) => {
    const residents = await new ResidentRepository().findResident();

    const decoded = req.decoded as Partial<Condominium>;

    const newResidents: Array<Partial<Resident>> = [];

    await Promise.all(
        residents.map(async (resident: Resident) => {
            const { password, ...residentWithoutPassword } = resident;

            const condo = await resident.condominium;

            if (condo?.condominiumId === decoded.condominiumId) {
                return newResidents.push(residentWithoutPassword);
            }
        }),
    );

    return res.status(200).json(newResidents);
};

export default getAllResidents;
