import { Request, Response, NextFunction } from 'express';

const verifyBody = (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ error: 'This route needs request body!' });
    }

    return next();
};

export default verifyBody;
