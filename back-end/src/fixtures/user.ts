import User from "../entities/user";

export async function createUser(): Promise<User> {
  const email = "someone@mail.com";
  const existingUser = await User.findOneBy({ email });
  return (
    existingUser ||
    User.saveNewUser({
      email,
      firstName: "Simone",
      lastName: "One",
      password: "azerty123456",
    })
  );
}
