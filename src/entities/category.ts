import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Ad from "./ad";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads!: Ad[];

  constructor(category?: Category) {
    super();

    if (category) {
      this.name = category.name;
    }
  }
}

export default Category;
