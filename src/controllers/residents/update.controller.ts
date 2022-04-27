import Resident from '../../entities/Resident';

import { Request, Response } from 'express';
import { updateResidentService } from '../../services';

const updateResident = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const updateResident = await updateResidentService(req, res);

    const { password, ...residentWithoutPassword } = updateResident as Resident;

    return res.status(200).json(residentWithoutPassword);
};

export default updateResident;
