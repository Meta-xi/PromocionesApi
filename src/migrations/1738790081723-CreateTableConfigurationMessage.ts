import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableConfigurationMessage1738790081723 implements MigrationInterface {
    name = 'CreateTableConfigurationMessage1738790081723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "configuracion_mensaje" ("id" SERIAL NOT NULL, "mensaje" json NOT NULL, "ids_destino" json NOT NULL, "intervalo" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_618fd9a26e7461e5736be2ee9aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" ADD CONSTRAINT "FK_6fabe174de0c1710ffef791abb0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" DROP CONSTRAINT "FK_6fabe174de0c1710ffef791abb0"`);
        await queryRunner.query(`DROP TABLE "configuracion_mensaje"`);
    }

}
