import { Args, Mutation, Resolver } from "type-graphql";
import User from "../entities/user";
import { CreateOrUpdateUser, SignInUser } from "../entities/user.args";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateOrUpdateUser) {
    return User.saveNewUser(args);
  }

  @Mutation(() => User)
  async signIn(@Args() args: SignInUser): Promise<User> {
    // TODO: get session ID and set in cookie
    const { user } = await User.signIn(args);
    return user;
  }
}
