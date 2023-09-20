import express, { response } from "express";
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
  response.status(201).json({ ad });
});

// GET /ads/:id
server.get("/ads/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const ad = ads.find((ad) => ad.id === id);
  if (!ad) {
    response.sendStatus(404);
  }
  response.json({ ad });
});

// DELETE /ads/:id
server.delete("/ads/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const adIndex = ads.findIndex((ad) => ad.id === id);
  if (adIndex === -1) {
    response.sendStatus(404);
  }
  const ad = ads[adIndex];
  ads.splice(adIndex, 1);
  response.json({ ad });
});

// PUT /ads/:id

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
