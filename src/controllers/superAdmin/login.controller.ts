import { Request, Response } from 'express';

const loginSuperAdmin = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    return await res.status(200).json({ token: req.token });
};

export default loginSuperAdmin;
