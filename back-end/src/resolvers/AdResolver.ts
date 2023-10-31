import Ad from "../entities/ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class AdResolver {
  @Query(() => [Ad])
  ads(@Arg("category", { nullable: true }) category: number) {
    return Ad.getAds(category ?? undefined);
  }

  @Query(() => Ad)
  ad() {
    //...
  }

  @Mutation(() => Ad)
  createAd() {
    //...
  }
}
