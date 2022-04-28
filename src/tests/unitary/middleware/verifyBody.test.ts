import { describe, it, expect } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';
import connectionTests from '../../../database';
import { verifyBody } from '../../../middlewares';
import { cleardata } from '../../utils';

const mockreq: Partial<Request> = {} as Request;
const mockres: Partial<Response> = {} as Response;
const mocknext: Partial<NextFunction> = jest.fn();

describe('Verify required body keys test suit', () => {
    beforeAll(async () => {
        await connectionTests();
    });

    beforeEach(async () => {
        cleardata();

        mockres.json = jest.fn().mockReturnValue(mockres);
        mockres.status = jest.fn().mockReturnValue(mockres);
    });

    it('Should get verb 400 when passing an empty body', async () => {
        mockreq.body = {};

        await verifyBody(
            mockreq as Request,
            mockres as Response,
            mocknext as NextFunction,
        );

        expect(mockres.status).toBeCalledTimes(1);
        expect(mockres.status).toBeCalledWith(400);

        expect(mockres.json).toBeCalledTimes(1);
        expect(mockres.json).toBeCalledWith({
            error: 'This route needs request body!',
        });
    });

    it('Must pass middleware validation and call the Next function', async () => {
        mockreq.body = {
            email: 'myemail@willpass.com',
        };

        await verifyBody(
            mockreq as Request,
            mockres as Response,
            mocknext as NextFunction,
        );

        expect(mocknext).toBeCalled();
        expect(mocknext).toBeCalledTimes(1);
    });

    afterAll(async () => {
        const defaultConnection = cleardata();
        await defaultConnection.close();
    });
});
