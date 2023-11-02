import Ad, { UpdateAd } from "../entities/ad";
import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import { CreateAd } from "../entities/ad";

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
  createAd(@Args() args: CreateAd) {
    return Ad.saveNewAd(args);
  }

  @Mutation(() => Ad)
  updateAd(@Arg("id", () => ID) id: string, @Args() args: UpdateAd) {
    return Ad.updateAd(id, args);
  }
}
