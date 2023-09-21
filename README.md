# The Good Corner

## Development

### Installing dependencies

```
npm install
```

### Initializing database

- Create an empty `db.sqlite` file for the database
- Open database with and SQLite client (for instance `sqlite3 db.sqlite`)
- Run the following scripts to set up database schema:

```
db-queries/create-table-category.sql
db-queries/create-table-ad.sql
```

### Running server

```
npm run dev
```
