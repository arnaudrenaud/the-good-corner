import express from "express";
import { DataSource } from "typeorm";

import Ad from "./entities/ad";
import { isError } from "./utils";
import Category from "./entities/category";
import Tag from "./entities/tag";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Ad {
    id: ID
    title: String
    description: String
    owner: String
    price: Float
    picture: String
    location: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    ads(category: Int): [Ad]
    
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    ads: (_: unknown, { category }: { category: number }) => {
      return Ad.getAds(category ?? undefined);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

const startApolloServer = async () => {
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});

const server = express();
server.use(express.json());

// Hello world
server.get("/", (request, response) => {
  return response.send("Hello from Express server.");
});

// GET /ads
// exemple de requête : /ads, /ads?category=1
server.get("/ads", async (request, response) => {
  const { query } = request;
  const ads = await Ad.getAds(
    query.category ? parseInt(query.category as string) : undefined
  );
  return response.json({ ads });
});

// POST /ads
server.post("/ads", async (request, response) => {
  const adData = request.body;
  try {
    const savedAd = await Ad.saveNewAd(adData);
    return response.status(201).json({ ad: savedAd });
  } catch (error) {
    if (isError(error)) {
      return response.status(400).json({ error: error.message });
    }
  }
});

// GET /ads/:id
server.get("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const ad = await Ad.getAdById(id);
    return response.json({ ad });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// DELETE /ads/:id
server.delete("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    await Ad.deleteAd(id);
    return response.json({ id });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// PUT /ads/:id
server.put("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const adData = request.body;

  if (adData.title === "") {
    return response.status(400).json({ error: "Title cannot be empty." });
  }
  if (adData.owner === "") {
    return response.status(400).json({ error: "Owner cannot be empty." });
  }

  try {
    const updatedAd = await Ad.updateAd(id, adData);
    return response.json({ ad: updatedAd });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

server.get("/tags", async (request, response) => {
  const tags = await Tag.getTags();
  return response.json({ tags });
});

server.post("/tags", async (request, response) => {
  const tagData = request.body;
  try {
    const savedTag = await Tag.saveNewTag(tagData);
    return response.status(201).json({ tag: savedTag });
  } catch (error) {
    if (isError(error)) {
      return response.status(400).json({ error: error.message });
    }
  }
});

const PORT = 4000;
server.listen(PORT, async () => {
  await dataSource.initialize();
  await Category.saveNewCategoryIfNotExisting({ id: 1, name: "Ameublement" });
  await Category.saveNewCategoryIfNotExisting({
    id: 2,
    name: "Électroménager",
  });
  await Category.saveNewCategoryIfNotExisting({ id: 3, name: "Photographie" });
  await Category.saveNewCategoryIfNotExisting({ id: 4, name: "Informatique" });
  await Category.saveNewCategoryIfNotExisting({ id: 5, name: "Téléphonie" });
  await Category.saveNewCategoryIfNotExisting({ id: 6, name: "Vélos" });
  await Category.saveNewCategoryIfNotExisting({ id: 7, name: "Véhicules" });
  await Category.saveNewCategoryIfNotExisting({ id: 8, name: "Sport" });
  await Category.saveNewCategoryIfNotExisting({ id: 9, name: "Habillement" });
  await Category.saveNewCategoryIfNotExisting({ id: 10, name: "Bébé" });
  await Category.saveNewCategoryIfNotExisting({ id: 11, name: "Outillage" });
  await Category.saveNewCategoryIfNotExisting({ id: 12, name: "Services" });
  await Category.saveNewCategoryIfNotExisting({ id: 13, name: "Vacances" });

  console.log(`Server listening on port ${PORT}.`);
});
