import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashSync } from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config();

export class tablesCreate1650309022033 implements MigrationInterface {
    name = 'tablesCreate1650309022033';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "service_providers" ("serviceProviderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying(11) NOT NULL, "socialMedia" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "occupation" character varying NOT NULL, CONSTRAINT "UQ_14d1adea0db135f924c3d017a7c" UNIQUE ("email"), CONSTRAINT "UQ_3037b49ecc662c78297f2f9aec7" UNIQUE ("cpf"), CONSTRAINT "PK_9c21c3548a4912e6cf690932fd6" PRIMARY KEY ("serviceProviderId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "condominiums_service_providers" ("condoServiceProvidersId" uuid NOT NULL DEFAULT uuid_generate_v4(), "isApproved" boolean NOT NULL DEFAULT false, "condominiumCondominiumId" uuid, "serviceProviderServiceProviderId" uuid, CONSTRAINT "PK_20405320f5fb81d258033c9718a" PRIMARY KEY ("condoServiceProvidersId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "condominiums" ("condominiumId" uuid NOT NULL DEFAULT uuid_generate_v4(), "condominiumName" character varying NOT NULL, "zipCode" character varying(8) NOT NULL, "district" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "trusteeName" character varying NOT NULL, "trusteeEmail" character varying NOT NULL, "trusteeCpf" character varying NOT NULL, "trusteePassword" character varying NOT NULL, CONSTRAINT "UQ_24a8a3c280fb8d57f5331f0f92f" UNIQUE ("condominiumName"), CONSTRAINT "UQ_93feef5c9455c1ffe7fe13e303c" UNIQUE ("trusteeEmail"), CONSTRAINT "UQ_55b8d960081ea8551e125f077ba" UNIQUE ("trusteeCpf"), CONSTRAINT "PK_98e9ac82497aa1236642ef7f2b5" PRIMARY KEY ("condominiumId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "residents" ("residentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying(14) NOT NULL, "apartmentBlock" character varying NOT NULL, "apartmentNumber" integer NOT NULL, "isAuth" boolean NOT NULL DEFAULT false, "condominiumCondominiumId" uuid, CONSTRAINT "UQ_674b467498da891ecc3bfeb9344" UNIQUE ("email"), CONSTRAINT "UQ_7d620dede9e09f8d58c77b51943" UNIQUE ("cpf"), CONSTRAINT "PK_36f852c7307ae0c2991a749c0f7" PRIMARY KEY ("residentId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "services" ("serviceId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "status" character varying NOT NULL DEFAULT 'available', "residentResidentId" uuid, "categoryCategoryId" uuid, "serviceProviderServiceProviderId" uuid, CONSTRAINT "PK_bd9b50de0bd3040ab0debaf36f5" PRIMARY KEY ("serviceId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "categories" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "super_admins" ("superAdminId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_9719b4228e14e28a8253cb108f2" UNIQUE ("email"), CONSTRAINT "PK_decbd3f5431190b32290d63a644" PRIMARY KEY ("superAdminId"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "condominiums_categories_categories" ("condominiumsCondominiumId" uuid NOT NULL, "categoriesCategoryId" uuid NOT NULL, CONSTRAINT "PK_b233d75121f5608c3aa3484776a" PRIMARY KEY ("condominiumsCondominiumId", "categoriesCategoryId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_8e9cb9deb7500504b5d6d1b149" ON "condominiums_categories_categories" ("condominiumsCondominiumId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_6a17d77a870ed7b67c23cf166d" ON "condominiums_categories_categories" ("categoriesCategoryId") `,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_service_providers" ADD CONSTRAINT "FK_c63b66fac5630e18c16ad0c7887" FOREIGN KEY ("condominiumCondominiumId") REFERENCES "condominiums"("condominiumId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_service_providers" ADD CONSTRAINT "FK_7e6b15e1834d12be2cbd52f13c5" FOREIGN KEY ("serviceProviderServiceProviderId") REFERENCES "service_providers"("serviceProviderId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "residents" ADD CONSTRAINT "FK_28abd03a0bb8f965adef9506afc" FOREIGN KEY ("condominiumCondominiumId") REFERENCES "condominiums"("condominiumId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "services" ADD CONSTRAINT "FK_5172978348f162a69a010123f34" FOREIGN KEY ("residentResidentId") REFERENCES "residents"("residentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "services" ADD CONSTRAINT "FK_a03d8f4612a66c4381d89493650" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "services" ADD CONSTRAINT "FK_aa6884a1043c3651f1d56c3a64a" FOREIGN KEY ("serviceProviderServiceProviderId") REFERENCES "service_providers"("serviceProviderId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_categories_categories" ADD CONSTRAINT "FK_8e9cb9deb7500504b5d6d1b1494" FOREIGN KEY ("condominiumsCondominiumId") REFERENCES "condominiums"("condominiumId") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_categories_categories" ADD CONSTRAINT "FK_6a17d77a870ed7b67c23cf166da" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `INSERT INTO "super_admins" ("name", "email", "password") VALUES ('${
                process.env.SUPER_ADMIN_NAME
            }', '${process.env.SUPER_ADMIN_EMAIL}', '${hashSync(
                process.env.SUPER_ADMIN_PASSWORD,
                10,
            )}') `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "condominiums_categories_categories" DROP CONSTRAINT "FK_6a17d77a870ed7b67c23cf166da"`,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_categories_categories" DROP CONSTRAINT "FK_8e9cb9deb7500504b5d6d1b1494"`,
        );
        await queryRunner.query(
            `ALTER TABLE "services" DROP CONSTRAINT "FK_aa6884a1043c3651f1d56c3a64a"`,
        );
        await queryRunner.query(
            `ALTER TABLE "services" DROP CONSTRAINT "FK_a03d8f4612a66c4381d89493650"`,
        );
        await queryRunner.query(
            `ALTER TABLE "services" DROP CONSTRAINT "FK_5172978348f162a69a010123f34"`,
        );
        await queryRunner.query(
            `ALTER TABLE "residents" DROP CONSTRAINT "FK_28abd03a0bb8f965adef9506afc"`,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_service_providers" DROP CONSTRAINT "FK_7e6b15e1834d12be2cbd52f13c5"`,
        );
        await queryRunner.query(
            `ALTER TABLE "condominiums_service_providers" DROP CONSTRAINT "FK_c63b66fac5630e18c16ad0c7887"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_6a17d77a870ed7b67c23cf166d"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_8e9cb9deb7500504b5d6d1b149"`,
        );
        await queryRunner.query(
            `DROP TABLE "condominiums_categories_categories"`,
        );
        await queryRunner.query(`DROP TABLE "super_admins"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "residents"`);
        await queryRunner.query(`DROP TABLE "condominiums"`);
        await queryRunner.query(`DROP TABLE "condominiums_service_providers"`);
        await queryRunner.query(`DROP TABLE "service_providers"`);
    }
}
