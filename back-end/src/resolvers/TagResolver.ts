import { Args, Mutation, Query, Resolver } from "type-graphql";
import Tag, { CreateOrUpdateTag } from "../entities/tag";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  tags() {
    return Tag.getTags();
  }

  @Mutation(() => Tag)
  createTag(@Args() args: CreateOrUpdateTag) {
    return Tag.saveNewTag(args);
  }
}
