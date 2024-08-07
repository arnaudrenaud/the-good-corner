import "reflect-metadata";
import { Response } from "express";

import Category from "./entities/category";
import User from "./entities/user";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { TagResolver } from "./resolvers/TagResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { getUserSessionIdFromCookie } from "./utils/cookie";
import { getDataSource } from "./database/database";
import { createFakeData } from "./fixtures";
import { getCache } from "./cache";

export type Context = { res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AdResolver, TagResolver, UserResolver],
    validate: true,
    authChecker,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { res: res as Response, user };
    },
  });

  await getDataSource();
  await Category.initializeCategories();

  if (process.env.NODE_ENV === "dev") {
    await createFakeData();
  }

  await getCache();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
