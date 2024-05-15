import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ILike,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Or,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

import Category from "./category";
import Tag from "./tag";
import { CreateOrUpdateAd } from "./ad.args";
import User from "./user";
import { getCacheClient } from "../cache";
import { getDataSource } from "../database";

type AdArgs = CreateOrUpdateAd & {
  owner: User;
};

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

  @ManyToOne(() => User, (user) => user.ads, { eager: true })
  @Field(() => User)
  owner!: User;

  @Column()
  @Field(() => Float)
  price!: number;

  @Column({ default: "" })
  @Field()
  picture!: string;

  @Column({ default: "" })
  @Field()
  location!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category!: Category;

  @JoinTable({ name: "TagsForAds" })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @Field(() => [Tag])
  tags!: Tag[];

  constructor(ad?: AdArgs) {
    super();

    if (ad) {
      this.title = ad.title;
      this.owner = ad.owner;
      this.description = ad.description;
      this.price = ad.price;
      this.picture = ad.picture;
      this.location = ad.location;
    }
  }

  static async saveNewAd(adData: AdArgs): Promise<Ad> {
    const newAd = new Ad(adData);

    const category = await Category.getCategoryById(adData.categoryId);
    newAd.category = category;

    // Promise.all will call each function in array passed as argument and resolve when all are resolved
    newAd.tags = await Promise.all(adData.tagIds.map(Tag.getTagById));

    const savedAd = await newAd.save();
    return savedAd;
  }

  static async getAds(categoryId?: number): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { id: categoryId } },
      order: { createdAt: "DESC" },
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

  static async deleteAd(id: string): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    await Ad.delete(id);
    return ad;
  }

  static async updateAd(id: string, partialAd: CreateOrUpdateAd): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    Object.assign(ad, partialAd);

    if (partialAd.categoryId) {
      ad.category = await Category.getCategoryById(partialAd.categoryId);
    }
    if (partialAd.tagIds) {
      ad.tags = await Promise.all(partialAd.tagIds.map(Tag.getTagById));
    }

    await ad.save();
    ad.reload();
    return ad;
  }

  static async searchAds(query: string): Promise<Ad[]> {
    const cache = await getCacheClient();
    const cacheResult = await cache.get(query);
    if (cacheResult) {
      return JSON.parse(cacheResult);
    }

    const databaseResult = await (
      await getDataSource()
    )
      .getRepository(Ad)
      .createQueryBuilder()
      .select()
      .where(
        `to_tsvector('simple', "title" || "description") @@ to_tsquery('simple', :query)`,
        {
          query: `${query}:*`,
        },
      )
      .getMany();

    await cache.set(query, JSON.stringify(databaseResult), { EX: 30 });
    return databaseResult;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
  }
}

export default Ad;
