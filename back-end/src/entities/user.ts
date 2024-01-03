import { ArgsType, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MinLength } from "class-validator";
import { hash } from "bcrypt";

@ArgsType()
export class CreateOrUpdateUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(1)
  firstName!: string;

  @Field()
  @MinLength(1)
  lastName!: string;

  @Field()
  @MinLength(12)
  password!: string;
}

@Entity("AppUser")
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Column()
  hashedPassword!: string;

  constructor(user?: CreateOrUpdateUser) {
    super();

    if (user) {
      this.email = user.email;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.hashedPassword = user.password;
    }
  }

  static async saveNewUser(userData: CreateOrUpdateUser): Promise<User> {
    userData.password = await hash(userData.password, 10);

    const newUser = new User(userData);
    // TODO: return user-friendly error message when email already used
    const savedUser = await newUser.save();
    return savedUser;
  }
}

export default User;
