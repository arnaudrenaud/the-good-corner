import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  createMethodDecorator,
} from "type-graphql";
import Ad from "../entities/ad";
import { CreateOrUpdateAd } from "../entities/ad.args";
import { Context } from "..";
import User from "../entities/user";

export function AdOwner() {
  return createMethodDecorator(async ({ args, context }, next) => {
    if (await (context as Context).user?.isAdOwner(args.id)) {
      return next();
    }
    throw new Error("You must own the ad to perform this action.");
  });
}

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

  @Query(() => [Ad])
  searchAds(@Arg("query") query: string) {
    return Ad.searchAds(query);
  }

  @Authorized()
  @Mutation(() => Ad)
  createAd(@Args() args: CreateOrUpdateAd, @Ctx() { user }: Context) {
    return Ad.saveNewAd({ ...args, owner: user as User });
  }

  @Authorized()
  @AdOwner()
  @Mutation(() => Ad)
  async updateAd(
    @Arg("id", () => ID) id: string,
    @Args() args: CreateOrUpdateAd,
  ) {
    return Ad.updateAd(id, args);
  }

  @Authorized()
  @AdOwner()
  @Mutation(() => Ad)
  async deleteAd(@Arg("id", () => ID) id: string) {
    return Ad.deleteAd(id);
  }
}
