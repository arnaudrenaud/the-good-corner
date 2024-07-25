import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721806608534 implements MigrationInterface {
  name = "Migration1721806608534";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ad" ADD "weightGrams" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "weightGrams"`);
  }
}
