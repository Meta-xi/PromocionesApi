import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737130351817 implements MigrationInterface {
    name = 'InitialMigration1737130351817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "idUserTelegram" bigint NOT NULL, "sesionToken" character varying NOT NULL, CONSTRAINT "UQ_b8d2022eea7da091b6c121d0335" UNIQUE ("idUserTelegram"), CONSTRAINT "UQ_d2b47292d37adbae3290add247d" UNIQUE ("sesionToken"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
