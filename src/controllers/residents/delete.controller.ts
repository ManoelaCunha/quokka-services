import { Request, Response } from 'express';
import { ResidentRepository } from '../../repositories';

const deleteResident = async (req: Request, res: Response) => {
    try {
        const requestedId = req.params.id;
        await new ResidentRepository().deleteResident(requestedId);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

export default deleteResident;
