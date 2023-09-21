export type TypeAd = {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price?: number;
  picture?: string;
  location?: string;
  createdAd?: number;
};

class Ad implements TypeAd {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price?: number;
  picture?: string;
  location?: string;
  createdAd?: number;

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
