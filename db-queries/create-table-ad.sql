CREATE TABLE Ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  owner VARCHAR(100) NOT NULL,
  price INT,
  picture TEXT,
  location VARCHAR(100),
  createdAt INTEGER
);