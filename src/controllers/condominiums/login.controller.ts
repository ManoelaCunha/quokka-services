import { Request, Response } from 'express';

const loginCondominium = async (
    req: Request,
    res: Response,
): Promise<Response> => res.status(200).json({ token: req.token });

export default loginCondominium;
