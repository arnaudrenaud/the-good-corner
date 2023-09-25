import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./category";
import Tag from "./tag";

@Entity()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: "" })
  description!: string;

  @Column()
  owner!: string;

  @Column({ nullable: true })
  price!: number;

  @Column({ default: "" })
  picture!: string;

  @Column({ default: "" })
  location!: string;

  @CreateDateColumn()
  createdAd!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category!: Category;

  @JoinTable({ name: "TagsForAds" })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  tags!: Tag[];

  constructor(ad?: Partial<Ad>) {
    super();

    if (ad) {
      if (!ad.title) {
        throw new Error("Ad title cannot be empty.");
      }
      this.title = ad.title;

      if (!ad.owner) {
        throw new Error("Ad owner cannot be empty.");
      }
      this.owner = ad.owner;
      if (ad.description) {
        this.description = ad.description;
      }
      if (ad.price) {
        this.price = ad.price;
      }
      if (ad.picture) {
        this.picture = ad.picture;
      }
      if (ad.location) {
        this.location = ad.location;
      }
    }
  }

  static async saveNewAd(
    adData: Partial<Ad> & { category?: number; tags?: number[] }
  ): Promise<Ad> {
    const newAd = new Ad(adData);
    if (adData.category) {
      const category = await Category.getCategoryById(adData.category);
      newAd.category = category;
    }
    // const associatedTags = [];
    if (adData.tags) {
      // for (const tagId of adData.tags) {
      //   const tag = await Tag.getTagById(tagId);
      //   associatedTags.push(tag);
      // }

      // Promise.all will call each function in array passed as argument and resolve when all are resolved
      newAd.tags = await Promise.all(adData.tags.map(Tag.getTagById));
    }
    const savedAd = await newAd.save();
    console.log(`New ad saved: ${savedAd.getStringRepresentation()}.`);
    return savedAd;
  }

  static async getAds(): Promise<Ad[]> {
    const ads = await Ad.find();
    return ads;
  }

  static async getAdById(id: number): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
    });
    if (!ad) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
    return ad;
  }

  static async deleteAd(id: number): Promise<void> {
    const { affected } = await Ad.delete(id);
    if (affected === 0) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
  }

  static async updateAd(
    id: number,
    partialAd: Partial<Ad> & { category?: number }
  ): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    if (partialAd.category) {
      await Category.getCategoryById(partialAd.category);
    }
    await Ad.update(id, partialAd);
    await ad.reload();
    return ad;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
  }
}

export default Ad;
