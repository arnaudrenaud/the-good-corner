import { Args, Mutation, Resolver } from "type-graphql";
import User, { CreateOrUpdateUser, SignInUser } from "../entities/user";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateOrUpdateUser) {
    return User.saveNewUser(args);
  }

  @Mutation(() => User)
  signIn(@Args() args: SignInUser) {
    // TODO: set session ID and persist it in cookie
    return User.getUserWithEmailAndPassword(args);
  }
}
