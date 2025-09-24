import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleAndRefreshToken1695560000000 implements MigrationInterface {
    name = 'AddRoleAndRefreshToken1695560000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE users ADD COLUMN refreshToken TEXT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN refreshToken`);
        await queryRunner.query(`ALTER TABLE users DROP COLUMN role`);
    }
}
