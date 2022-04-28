import 'reflect-metadata';

import { describe, it, expect } from '@jest/globals';
import { getConnection } from 'typeorm';
import request from 'supertest';

import app from './../../../app';
import connection from './../../../database';
import { generateSuperAdm } from './../../utils';

const superadm = generateSuperAdm();

describe('Create Super Admin', () => {
    beforeAll(async () => {
        await connection();
    });

    it('should be able to register a SUPER ADMIN', async () => {
        const response = await request(app).post(`/super_adm`).send(superadm);
        const { body } = response;

        expect(response.statusCode).toBe(201);
        expect(body.name).toBe(superadm.name);
        expect(body.email).toBe(superadm.email);
    });

    afterAll(async () => {
        const defaultConnection = getConnection('default');
        defaultConnection.query(
            `DELETE FROM super_admin WHERE email = ${superadm.email}`,
        );
        await defaultConnection.close();
    });
});
