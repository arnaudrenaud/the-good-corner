import { getDataSource } from "../database";
import Ad from "./ad";
import Category from "./category";
import Tag from "./tag";
import User from "./user";

jest.mock("../utils/email", () => ({ sendEmail: jest.fn() }));

async function createOwnerCategoryTags() {
  const owner = await User.saveNewUser({
    email: "me@test.com",
    firstName: "Arnaud",
    lastName: "Renaud",
    password: "otherpassword",
  });

  const category = await Category.saveNewCategoryIfNotExisting({
    id: 1,
    name: "Ameublement",
  });
  const tagCollection = await Tag.saveNewTag({
    name: "Collection",
  });
  const tagNew = await Tag.saveNewTag({
    name: "New",
  });
  return { owner, category, tagCollection, tagNew };
}

describe("Ad", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("saveNewAd", () => {
    it("creates ad and returns it", async () => {
      const { owner, category, tagCollection, tagNew } =
        await createOwnerCategoryTags();

      const adToCreate = {
        title: "Mon annonce",
        description: "lorem ipsum",
        price: 100,
        picture: "picture-url",
        location: "Paris",
        owner,
      };
      const returnedAd = await Ad.saveNewAd({
        ...adToCreate,
        categoryId: category.id,
        tagIds: [tagCollection.id, tagNew.id],
      });

      expect(returnedAd).toMatchObject(adToCreate);
      expect(returnedAd.category).toMatchObject(category);
      expect(returnedAd.owner).toMatchObject(owner);
      expect(returnedAd.tags[0]).toMatchObject(tagCollection);
      expect(returnedAd.tags[1]).toMatchObject(tagNew);

      expect(await Ad.getAdById(returnedAd.id)).toEqual(returnedAd);
    });
  });
});
