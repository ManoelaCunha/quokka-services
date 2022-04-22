import { Request, Response } from 'express';
import Resident from '../../entities/Resident';
import { ResidentRepository } from '../../repositories';
import { IResident } from '../../repositories/resident/interfaces';

const createResident = async (req: Request, res: Response) => {
    const { validated } = req;
    const residentAttributes: IResident = { ...validated } as IResident;

    delete residentAttributes.password;

    try {
        await new ResidentRepository().saveResident(validated as Resident);

        return res.status(201).json(residentAttributes);
    } catch (error) {
        return res.status(400).json({ message: error.driverError.detail });
    }
};

export default createResident;
