import { Request, Response } from 'express';

const loginSuperAdmin = async (req: Request, res: Response) => {
    try {
        const { token } = req;

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export default loginSuperAdmin;
