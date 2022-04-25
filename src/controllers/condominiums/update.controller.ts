import Condominium from '../../entities/Condominium';

import { Request, Response } from 'express';
import { updateCondominiumService } from '../../services';

const updateCondominium = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const updateCondominium = await updateCondominiumService(req, res);

    const { trusteePassword, ...condominiumWithoutPassword } =
        updateCondominium as Condominium;

    return res.status(200).json(condominiumWithoutPassword);
};

export default updateCondominium;
