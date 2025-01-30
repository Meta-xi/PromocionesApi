import { MigrationInterface, QueryRunner } from "typeorm";

export class QuitUniqueSesionToken1737654534117 implements MigrationInterface {
    name = 'QuitUniqueSesionToken1737654534117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d2b47292d37adbae3290add247d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d2b47292d37adbae3290add247d" UNIQUE ("sesionToken")`);
    }

}
