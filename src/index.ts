import express from "express";
import { ads } from "./ads";

const server = express();

// Hello world
server.get("/", (request, response) => {
  response.send("Hello from Express server.");
});

// GET /ads
server.get("/ads", (request, response) => {
  response.json({ ads });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
