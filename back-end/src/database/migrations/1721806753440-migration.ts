import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721806753440 implements MigrationInterface {
  name = "Migration1721806753440";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ad" ALTER COLUMN "weightGrams" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ad" ALTER COLUMN "weightGrams" SET DEFAULT '0'`,
    );
  }
}
