import { Response, Request } from 'express';

const loginResident = async (req: Request, res: Response): Promise<Response> =>
    res.status(200).json({ token: req.token });

export default loginResident;
