import { Request, Response } from 'express';
import Resident from '../../entities/Resident';
import { ResidentRepository } from '../../repositories';

const getAllResidents = async (req: Request, res: Response) => {
    const residents = await new ResidentRepository().findResident();

    const newResidents: Array<Partial<Resident>> = [];

    residents.map((resident: Resident) => {
        const { password, ...residentWithoutPassword } = resident;

        newResidents.push(residentWithoutPassword);
    });

    return res.status(200).json(newResidents);
};

export default getAllResidents;
