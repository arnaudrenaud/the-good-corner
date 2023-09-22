import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export type TypeAd = {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price?: number;
  picture?: string;
  location?: string;
  createdAd?: Date;
};

@Entity()
class Ad extends BaseEntity implements TypeAd {
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

  constructor(ad?: TypeAd) {
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

  // static getAllAds() {
  //   // retourner toutes les annonces
  // }

  // getShortDescriptionAndTitle() {
  //   return `${this.title} - ${this.price} €`;
  // }
}

// const voiture = new Ad(1, "Voiture", "", "Arnaud");

export default Ad;
