import 'reflect-metadata';

import { describe, it, test } from '@jest/globals';
import request from 'supertest';
import app from './../../app';
import { v4 } from 'uuid';
import { Response, Request } from 'express';
import { createSuperAdmin } from '../../controllers';
import connection from '../../database';
import { getConnection } from 'typeorm';

const superadm = {
    name: 'Super Administrator',
    email: 'super_adm@email.com',
    password: '1234',
    superAdminId: v4(),
};

describe('Create Super Admin', () => {
    beforeAll(async () => {
        await connection();
    });

    it('should be able to register a SUPER ADMIN', async () => {
        const response = await request(app).post(`/super_adm`).send(superadm);

        console.log(response.body);
    });

    afterAll(async () => {
        const defaultConnection = getConnection('default');
        await defaultConnection.close();
    });
});
