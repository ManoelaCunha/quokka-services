import { Request, Response } from 'express';
import { getAllSuperAdminService } from '../../services';

const getAllSuperAdmin = async (
    _: Request,
    res: Response,
): Promise<Response> => {
    const admins = await getAllSuperAdminService();

    return res.status(200).json(admins);
};

export default getAllSuperAdmin;
