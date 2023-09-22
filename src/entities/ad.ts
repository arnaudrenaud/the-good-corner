import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./category";

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

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category;

  constructor(ad?: Ad) {
    super();

    if (ad) {
      this.title = ad.title;
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

  static async saveNewAd(adData: any): Promise<Ad> {
    const newAd = new Ad(adData);
    const savedAd = await newAd.save();
    console.log(`New ad saved: ${savedAd.getStringRepresentation()}.`);
    return savedAd;
  }

  static async getAds(): Promise<Ad[]> {
    const ads = await Ad.find();
    return ads;
  }

  static async getAd(id: number): Promise<Ad> {
    const ad = await Ad.findOneBy({ id });
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

  static async updateAd(id: number, partialAd: Partial<Ad>): Promise<Ad> {
    const ad = await Ad.getAd(id);
    await Ad.update(id, partialAd);
    await ad.reload();
    return ad;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
  }
}

export default Ad;
