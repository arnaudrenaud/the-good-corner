import express from "express";
import { Database } from "sqlite3";

import { ads } from "./ads";

const db = new Database("db.sqlite");

const server = express();
server.use(express.json());

// Hello world
server.get("/", (request, response) => {
  return response.send("Hello from Express server.");
});

// GET /ads
server.get("/ads", (request, response) => {
  db.all("SELECT * FROM Ad;", function (err, ads) {
    return response.json({ ads });
  });
});

// POST /ads
server.post("/ads", (request, response) => {
  const ad = request.body;

  if (!ad.title) {
    return response.status(400).json({ error: "Title cannot be empty." });
  }
  if (!ad.owner) {
    return response.status(400).json({ error: "Owner cannot be empty." });
  }

  // ads.push(ad);
  db.run(
    "INSERT INTO Ad (title, description, owner, price, picture, location) VALUES (?, ?, ?, ?, ?, ?);",
    [ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location],
    function (err) {
      if (err) {
        return response.status(400);
      }
      return response.status(201).json({ id: this.lastID });
    }
  );
});

// GET /ads/:id
server.get("/ads/:id", (request, response) => {
  const id = request.params.id;

  db.get("SELECT * FROM Ad WHERE id = ?", [id], (err, ad) => {
    if (err) {
      console.error(err.message);
      return response.sendStatus(500);
    }

    if (ad) {
      return response.json({ ad });
    } else {
      //404 : la ressource n'existe pas
      return response.sendStatus(404);
    }
  });
});

// DELETE /ads/:id
server.delete("/ads/:id", (request, response) => {
  const id = parseInt(request.params.id);
  db.run("DELETE FROM Ad WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      return response.sendStatus(500);
    }
    return response.json({ id });
  });
});

type Ad = {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price?: number;
  picture?: string;
  location?: string;
  createdAd?: number;
};

// PUT /ads/:id
server.put("/ads/:id", (request, response) => {
  const id = parseInt(request.params.id);

  db.get("SELECT * FROM Ad WHERE id = ?", [id], function (err, ad: Ad) {
    if (err) {
      console.error(err.message);
      return response.sendStatus(500);
    } else if (!ad) {
      return response.sendStatus(404);
    } else {
      const rawData = request.body;

      if (rawData.title === "") {
        return response.status(400).json({ error: "Title cannot be empty." });
      }
      if (rawData.owner === "") {
        return response.status(400).json({ error: "Owner cannot be empty." });
      }

      const updatedAd = {
        ...ad,
        title: rawData.title || ad.title,
        description: rawData.description ?? ad.description,
        owner: rawData.owner || ad.owner,
        price: rawData.price ?? ad.price,
        picture: rawData.picture ?? ad.picture,
        location: rawData.location ?? ad.location,
      };

      db.run(
        "UPDATE Ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ? WHERE id = ?",
        [
          updatedAd.title,
          updatedAd.description,
          updatedAd.owner,
          updatedAd.price,
          updatedAd.picture,
          updatedAd.location,
          id,
        ],
        function (err) {
          if (err) {
            console.error(err.message);
            return response.sendStatus(500);
          } else {
            return response.json({ ad: updatedAd });
          }
        }
      );
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
