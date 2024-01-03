import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./user";

@Entity()
class UserSession extends BaseEntity {
  @PrimaryColumn({ length: 32 })
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;
}

export default UserSession;
