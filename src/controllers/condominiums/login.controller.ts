import { Request, Response } from 'express';

const loginCondominium = async (
    req: Request,
    res: Response,
): Promise<Response> => await res.status(200).json({ msg: 'its work' });

export default loginCondominium;
