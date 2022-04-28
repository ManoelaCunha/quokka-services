import { Request, Response } from 'express';
import { SuperAdminRepository } from '../../repositories';

const retrieveSuperAdminById = async (req: Request, res: Response) => {
    const { password, ...superAdminWithouPasword } =
        await new SuperAdminRepository().findById(req.params.id);

    return res.status(200).json(superAdminWithouPasword);
};

export default retrieveSuperAdminById;
