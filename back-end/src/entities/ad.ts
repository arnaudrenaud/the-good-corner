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
import { ObjectType, Field, ID, Float } from "type-graphql";

import Category from "./category";
import Tag from "./tag";

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column({ default: "" })
  @Field()
  description!: string;

  @Column()
  @Field()
  owner!: string;

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  price!: number;

  @Column({ default: "" })
  @Field()
  picture!: string;

  @Column({ default: "" })
  @Field()
  location!: string;

  @CreateDateColumn()
  @Field()
  createdAd!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category!: Category;

  @JoinTable({ name: "TagsForAds" })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @Field(() => [Tag])
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
    adData: Partial<Ad> & { category?: number; tags?: string[] }
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

  static async getAds(categoryId?: number): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { id: categoryId } },
      order: { createdAd: "DESC" },
    });
    return ads;
  }

  static async getAdById(id: string): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
    });
    if (!ad) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
    return ad;
  }

  static async deleteAd(id: string): Promise<void> {
    const { affected } = await Ad.delete(id);
    if (affected === 0) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
  }

  static async updateAd(
    id: string,
    partialAd: Partial<Ad> & { category?: number; tags?: string[] }
  ): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    Object.assign(ad, partialAd);

    if (partialAd.category) {
      await Category.getCategoryById(partialAd.category);
    }
    if (partialAd.tags) {
      ad.tags = await Promise.all(partialAd.tags.map(Tag.getTagById));
    }

    await ad.save();
    ad.reload();
    return ad;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
  }
}

export default Ad;
