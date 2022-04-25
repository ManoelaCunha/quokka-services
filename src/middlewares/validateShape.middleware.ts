import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const validateShape =
    (shape: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await shape.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            console.log('LUL');

            req.validated = validated;

            return next();
        } catch (error) {
            return res.status(400).json({ error: error.errors.join(', ') });
        }
    };

export default validateShape;
