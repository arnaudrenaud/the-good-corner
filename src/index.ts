import express from "express";
import { ads } from "./ads";

const server = express();
server.use(express.json());

// Hello world
server.get("/", (request, response) => {
  response.send("Hello from Express server.");
});

// GET /ads
server.get("/ads", (request, response) => {
  response.json({ ads });
});

// POST /ads
server.post("/ads", (request, response) => {
  const ad = request.body;

  ads.push(ad);
  response.json({ ad });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
