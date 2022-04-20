import { Request, Response } from 'express';
import { SuperAdminRepository } from '../../repositories';

const retrieveSuperAdminById = async (req: Request, res: Response) => {
    const superAdmins = await new SuperAdminRepository().findAll();

    const { password, ...superAdminWithouPasword } = superAdmins.find(
        (adm) => adm.superAdminId === req.params.id,
    );

    return res.status(200).json(superAdminWithouPasword);
};

export default retrieveSuperAdminById;
