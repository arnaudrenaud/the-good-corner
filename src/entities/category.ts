import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  constructor(category?: Category) {
    super();

    if (category) {
      this.name = category.name;
    }
  }
}

export default Category;
