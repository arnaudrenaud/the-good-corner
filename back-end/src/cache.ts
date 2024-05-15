import { RedisClientType, createClient } from "redis";

let client: RedisClientType;

export async function getCacheClient() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_CACHE_URL });
    await client.connect();
  }
  return client;
}
