import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("AppUser")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  hashedPassword!: string;
}

export default User;
