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

  constructor(category?: Partial<Category>) {
    super();

    if (category) {
      if (!category.name) {
        throw new Error("Category name cannot be empty.");
      }
      this.name = category.name;
    }
  }

  static async saveNewCategoryIfNotExisting(
    categoryData: Partial<Category>
  ): Promise<Category> {
    if (!categoryData.name) {
      throw new Error("Category name cannot be empty.");
    }
    const existingCategory = await Category.getCategoryByName(
      categoryData.name
    );
    if (existingCategory) {
      return existingCategory;
    }
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    console.log(
      `New category saved: ${savedCategory.getStringRepresentation()}.`
    );
    return savedCategory;
  }

  static async getCategoryById(id: number): Promise<Category> {
    const category = await Category.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with ID ${id} does not exist.`);
    }
    return category;
  }

  private static async getCategoryByName(
    name: string
  ): Promise<Category | null> {
    const category = await Category.findOneBy({ name });
    return category;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.name}`;
  }
}

export default Category;
