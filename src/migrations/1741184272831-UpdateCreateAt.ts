import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCreateAt1741184272831 implements MigrationInterface {
    name = 'UpdateCreateAt1741184272831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
