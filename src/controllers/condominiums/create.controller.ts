import { Request, Response } from 'express';
import Condominium from '../../entities/Condominium';
import { CondominiumRepository } from '../../repositories';

const createCondomonium = async (req: Request, res: Response) => {
    const { validated } = req;

    try {
        const condominium = await new CondominiumRepository().saveCondominium(
            validated as Condominium,
        );
        return res.status(201).json(condominium);
    } catch (error) {
        return res.status(400).json({ message: error.driverError.detail });
    }
};

export default createCondomonium;
