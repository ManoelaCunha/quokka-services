import 'reflect-metadata';
import dotenv from 'dotenv';

import { describe, it, expect } from '@jest/globals';
import { getConnection } from 'typeorm';
import request from 'supertest';

import app from './../../../app';
import connection from './../../../database';
import { generateSuperAdm, generateSuperAdminToken } from './../../utils';

dotenv.config();

const superadm = generateSuperAdm();

describe('Create Super Admin', () => {
    beforeAll(async () => {
        await connection();
    });

    it('should be able to register a SUPER ADMIN', async () => {
        const response = await request(app)
            .post(`/super_adm`)
            .set('Authorization', `Bearer ${generateSuperAdminToken()}`)
            .send(superadm);
        const { body } = response;

        expect(response.statusCode).toBe(201);
        expect(body.name).toBe(superadm.name);
        expect(body.email).toBe(superadm.email);
    });

    it('Should be able to login', async () => {
        const response = await request(app).post(`/super_adm/login`).send({
            email: process.env.SUPER_ADMIN_EMAIL,
            password: process.env.SUPER_ADMIN_PASSWORD,
        });
        const { body } = response;

        expect(body).toHaveProperty('token');
    });

    afterAll(async () => {
        const defaultConnection = getConnection('default');
        defaultConnection.query(
            `DELETE FROM super_admin WHERE email = ${superadm.email}`,
        );
        await defaultConnection.close();
    });
});
