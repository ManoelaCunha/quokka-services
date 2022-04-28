import { NextFunction, request, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../../../configs/jwt.config';
import SuperAdmin from '../../../entities/SuperAdmin';
import { authToken } from '../../../middlewares';
import { SuperAdminRepository } from '../../../repositories';
import dotenv from 'dotenv';
import connectionTests from '../../../database';

dotenv.config();

describe('unit test for authtoken middleware', () => {
    const mockReq: Partial<Request> = {} as Request;
    const mockRes: Partial<Response> = {};
    const mockNext: Partial<NextFunction> = jest.fn();

    beforeAll(async () => {
        await connectionTests();
    });

    beforeEach(() => {
        mockRes.json = jest.fn().mockReturnValue(mockRes);
        mockRes.status = jest.fn().mockReturnValue(mockRes);
    });

    it('test if mockNext was called and mockReq has token', async () => {
        mockReq.validated = {
            email: process.env.SUPER_ADMIN_EMAIL,
            password: process.env.SUPER_ADMIN_PASSWORD,
        } as SuperAdmin;
        const authorizedSuperAdmin = authToken(SuperAdminRepository);
        await authorizedSuperAdmin(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction,
        );

        expect(mockNext).toBeCalled();
        expect(mockNext).toBeCalledTimes(1);
        expect(mockReq).toHaveProperty('token');
        expect(verify(mockReq.token, config.secret)).toBeTruthy();
    });

    it('test if SuperAdmin is not registered on the Database', async () => {
        mockReq.validated = {
            email: 'ahsuahsuahshauhs@mail.com',
            password: 'aajshjausiajsauh',
        } as SuperAdmin;

        const authorizedSuperAdmin = authToken(SuperAdminRepository);
        await authorizedSuperAdmin(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction,
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(404);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({ error: 'Email not found!' });
    });

    it('test if SuperAdmin email/password is invalid', async () => {
        mockReq.validated = {
            email: 'adm@mail.com',
            password: 'aajshjausiajsauh',
        } as SuperAdmin;

        const authorizedSuperAdmin = authToken(SuperAdminRepository);
        await authorizedSuperAdmin(
            mockReq as Request,
            mockRes as Response,
            mockNext as NextFunction,
        );

        expect(mockRes.status).toBeCalled();
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(401);

        expect(mockRes.json).toBeCalled();
        expect(mockRes.json).toBeCalledTimes(1);
        expect(mockRes.json).toBeCalledWith({ error: 'Wrong email/password' });
    });
});
