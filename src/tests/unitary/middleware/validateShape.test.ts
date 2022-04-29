import faker from '@faker-js/faker';
import { NextFunction, Request, Response } from 'express';
import connectionTests from '../../../database';
import { validateShape } from '../../../middlewares';
import dotenv from 'dotenv';
import { loginSuperAdminShape } from '../../../shapes';
import SuperAdmin from '../../../entities/SuperAdmin';

dotenv.config();

describe('unit test for validate shape middleware', () => {
    const mockReq: Partial<Request> = {} as Request;
    const mockRes: Partial<Response> = {};
    const mockNext: Partial<NextFunction> = jest.fn();

    beforeEach(() => {
        mockRes.json = jest.fn().mockReturnValue(mockRes);
        mockRes.status = jest.fn().mockReturnValue(mockRes);
    });

    it('test if mockNext was called and mockReq has validated when trying to login as super admin', async () => {
        const shapeToValidate = validateShape(loginSuperAdminShape);
        mockReq.body = {
            email: 'admin@mail.com',
            password: '123456',
        };
        await shapeToValidate(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction,
        );
        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);
        expect(mockReq).toHaveProperty('validated');
    });

    it('test if email is malformed on login as superadmin', async () => {
        const shapeToValidate = validateShape(loginSuperAdminShape);
        mockReq.body = {
            email: 'admin@mailcom',
            password: '123456',
        };
        await shapeToValidate(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction,
        );
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.json).toBeCalledWith({
            error: 'email must be a valid email',
        });
    });
});
