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

  // constructor(id: number, title: string, description: string, owner: string) {
  //   this.id = id;
  //   this.title = title;
  //   this.owner = owner;
  //   this.description = description;
  // }

  // static getAllAds() {
  //   // retourner toutes les annonces
  // }

  // getShortDescriptionAndTitle() {
  //   return `${this.title} - ${this.price} €`;
  // }
}

// const voiture = new Ad(1, "Voiture", "", "Arnaud");

export default Ad;
