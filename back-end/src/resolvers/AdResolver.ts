import Ad from "../entities/ad";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class AdResolver {
  @Query(() => [Ad])
  ads(@Arg("category", { nullable: true }) category: number) {
    return Ad.getAds(category ?? undefined);
  }

  @Query(() => Ad)
  ad(@Arg("id", () => ID) id: string) {
    return Ad.getAdById(id);
  }

  @Mutation(() => Ad)
  createAd() {
    //...
  }
}
