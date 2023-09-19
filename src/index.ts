import express from "express";

const server = express();

server.get("/", (request, response) => {
  response.send("Hello from Express server.");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
