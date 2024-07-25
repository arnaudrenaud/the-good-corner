import { ObjectId } from "typeorm";
import { getDataSource } from "../database/database";
import { sendEmail } from "../utils/email";
import User from "./user";
import Ad from "./ad";
import Category from "./category";

jest.mock("../utils/email", () => ({ sendEmail: jest.fn() }));

describe("User", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("getUserWithEmailAndPassword", () => {
    const { email, password } = {
      email: "me@test.com",
      password: "123456azerty",
    };

    describe("when email matches no user in database", () => {
      it("throws error", async () => {
        await expect(
          User.getUserWithEmailAndPassword({ email, password }),
        ).rejects.toThrow("INVALID_CREDENTIALS");
      });
    });

    describe("when email matches user in database", () => {
      describe("when password does not match password in database", () => {
        it("throws error", async () => {
          await User.saveNewUser({
            email,
            firstName: "Arnaud",
            lastName: "Renaud",
            password: "otherpassword",
          });

          await expect(
            User.getUserWithEmailAndPassword({ email, password }),
          ).rejects.toThrow("INVALID_CREDENTIALS");
        });
      });

      describe("when password matches password in database", () => {
        it("returns user", async () => {
          const user = await User.saveNewUser({
            email,
            firstName: "Arnaud",
            lastName: "Renaud",
            password,
          });

          await expect(
            User.getUserWithEmailAndPassword({ email, password }),
          ).resolves.toEqual(user);
        });
      });
    });
  });

  describe("saveNewUser", () => {
    it("saves user and returns it", () => {
      // …
    });

    it("calls sendEmail with user email address", async () => {
      await User.saveNewUser({
        email: "me@test.com",
        firstName: "Arnaud",
        lastName: "Renaud",
        password: "azerty123456",
      });

      expect(sendEmail).toHaveBeenCalledTimes(1);
      expect(sendEmail).toHaveBeenCalledWith("me@test.com");
    });
  });

  describe("isAdOwner", () => {
    let me: User;
    let other: User;

    const adProperties = {
      title: "Mon annonce",
      description: "lorem ipsum",
      price: 100,
      weightGrams: 200,
      picture: "picture-url",
      location: "Paris",
      categoryId: 1,
      tagIds: [],
    };

    beforeEach(async () => {
      me = await User.saveNewUser({
        email: "me@test.com",
        firstName: "Arnaud",
        lastName: "Renaud",
        password: "azerty123456",
      });

      other = await User.saveNewUser({
        email: "other@test.com",
        firstName: "B.",
        lastName: "C.",
        password: "otherpassword",
      });

      await Category.saveNewCategoryIfNotExisting({
        id: 1,
        name: "Ameublement",
      });
    });

    describe("when ad does not exist", () => {
      it("returns false", async () => {
        expect(
          await me.isAdOwner("97f7b0c5-8290-4a1c-bb33-6cd04796f87f"),
        ).toEqual(false);
      });
    });

    describe("when ad does exist", () => {
      describe("if user is not ad owner", () => {
        it("returns false", async () => {
          const ad = await Ad.saveNewAd({
            ...adProperties,
            owner: other,
          });

          expect(await me.isAdOwner(ad.id)).toEqual(false);
        });
      });

      describe("if user is ad owner", () => {
        it("returns true", async () => {
          const ad = await Ad.saveNewAd({
            ...adProperties,
            owner: me,
          });

          expect(await me.isAdOwner(ad.id)).toEqual(true);
        });
      });
    });
  });
});
