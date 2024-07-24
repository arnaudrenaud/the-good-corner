import { faker } from "@faker-js/faker";

import User from "../entities/user";
import Ad from "../entities/ad";

const ADS_COUNT = 10000;

export async function createManyAds(owner: User): Promise<void> {
  if ((await Ad.count()) >= ADS_COUNT) {
    return;
  }

  const ads = Array.from({ length: ADS_COUNT }, () => ({
    title: faker.word.noun(),
    description: faker.word.words({ count: { min: 10, max: 50 } }),
    price: faker.number.int({ min: 1, max: 1000 }),
    weightGrams: faker.number.int({ min: 1, max: 10000 }),
  }));

  for (const ad of ads) {
    await Ad.saveNewAd({
      ...ad,
      owner,
      categoryId: 1,
      picture: "",
      location: "",
      tagIds: [],
    });
  }
}
