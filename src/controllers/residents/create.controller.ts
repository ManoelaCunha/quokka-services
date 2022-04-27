import Resident from '../../entities/Resident';

import { Request, Response } from 'express';
import { createResidentService } from '../../services';

const createResident = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const newResident = await createResidentService(req, res);

    const { password, ...residentWithoutPassword } = newResident as Resident;

    return res.status(201).json(residentWithoutPassword);
};

export default createResident;
