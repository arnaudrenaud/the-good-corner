# The Good Corner

## Development

### Installing dependencies

```
npm install
```

### Initializing database

- Create an empty `db.sqlite` file for the database
- Open database with and SQLite client (for instance `sqlite3 db.sqlite`)
- Run the following query to create an `Ad` table:

```sql
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
```

### Running server

```
npm run dev
```
