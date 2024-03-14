import { getDataSource } from "../database";
import { sendEmail } from "../utils/email";
import User from "./user";

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
});
