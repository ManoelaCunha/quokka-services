import { Request, Response } from 'express';
import Condominium from '../../entities/Condominium';
import { CondominiumRepository } from '../../repositories';

const getAllCondominiums = async (req: Request, res: Response) => {
    const condominiums = await new CondominiumRepository().findCondominiums();

    const newCondominiums: Array<Partial<Condominium>> = [];

    condominiums.map((condominium: Condominium) => {
        const { trusteePassword, ...condominiumWithoutPassword } = condominium;

        newCondominiums.push(condominiumWithoutPassword);
    });

    return res.status(200).json(newCondominiums);
};

export default getAllCondominiums;
