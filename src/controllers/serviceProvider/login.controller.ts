import { Request, Response } from 'express';

const loginServiceProvider = async (
    { token }: Request,
    res: Response,
): Promise<Response> => res.status(200).json({ token });

export default loginServiceProvider;
