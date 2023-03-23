import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationAddTableUsers1679506277305 implements MigrationInterface {
    name = 'migrationAddTableUsers1679506277305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_name" character varying(30) NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "is_confirm_email" boolean NOT NULL DEFAULT false, "avatar" character varying, "refresh_token" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
