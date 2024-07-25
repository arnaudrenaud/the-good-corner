import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721806335450 implements MigrationInterface {
  name = "Migration1721806335450";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_session" ("id" character varying(32) NOT NULL, "userId" uuid, CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "AppUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "UQ_fc9d46269ef4c91e17262748f9f" UNIQUE ("email"), CONSTRAINT "PK_616b1af76abd9437231bc736ca6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ad" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "price" integer NOT NULL, "picture" character varying NOT NULL DEFAULT '', "location" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, "categoryId" integer, CONSTRAINT "PK_0193d5ef09746e88e9ea92c634d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TagsForAds" ("adId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_f17c6839bd4709726b907fefa16" PRIMARY KEY ("adId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_256f37a80f68bcda8094748c4b" ON "TagsForAds" ("adId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70d1b1e53059e5deaad2f3fe4e" ON "TagsForAds" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_session" ADD CONSTRAINT "FK_b5eb7aa08382591e7c2d1244fe5" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ad" ADD CONSTRAINT "FK_60e59329bce691e9d31a3e3131b" FOREIGN KEY ("ownerId") REFERENCES "AppUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ad" ADD CONSTRAINT "FK_c418809c6e081f861cefe495668" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TagsForAds" ADD CONSTRAINT "FK_256f37a80f68bcda8094748c4b3" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "TagsForAds" ADD CONSTRAINT "FK_70d1b1e53059e5deaad2f3fe4eb" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TagsForAds" DROP CONSTRAINT "FK_70d1b1e53059e5deaad2f3fe4eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TagsForAds" DROP CONSTRAINT "FK_256f37a80f68bcda8094748c4b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ad" DROP CONSTRAINT "FK_c418809c6e081f861cefe495668"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ad" DROP CONSTRAINT "FK_60e59329bce691e9d31a3e3131b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_session" DROP CONSTRAINT "FK_b5eb7aa08382591e7c2d1244fe5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70d1b1e53059e5deaad2f3fe4e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_256f37a80f68bcda8094748c4b"`,
    );
    await queryRunner.query(`DROP TABLE "TagsForAds"`);
    await queryRunner.query(`DROP TABLE "ad"`);
    await queryRunner.query(`DROP TABLE "AppUser"`);
    await queryRunner.query(`DROP TABLE "user_session"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
