import { Request, Response } from 'express';
import { SuperAdminRepository } from '../../repositories';

const retrieveSuperAdminById = async (req: Request, res: Response) => {
    try {
        const { password, ...superAdminWithouPasword } =
            await new SuperAdminRepository().findById(req.params.id);

        return res.status(200).json(superAdminWithouPasword);
    } catch (error) {
        return res.status(400).json({
            error: 'Requisition failed, verify the id and try again',
        });
    }
};

export default retrieveSuperAdminById;
