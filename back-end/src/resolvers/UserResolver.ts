import { Args, Mutation, Resolver } from "type-graphql";
import User, { CreateOrUpdateUser } from "../entities/user";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateOrUpdateUser) {
    return User.saveNewUser(args);
  }
}
