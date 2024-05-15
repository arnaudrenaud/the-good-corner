import { createManyAds } from "./ad";
import { createUser } from "./user";

export async function createFakeData() {
  const defaultUser = await createUser();
  await createManyAds(defaultUser);
}
