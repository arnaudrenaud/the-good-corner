# The Good Corner

## Development

Run app:

```
docker compose up --build
```

### Setting web-app types after GraphQL

Generate query-specific types for web-app development:

```
cd web-app
npm run graphql-codegen
```

These types can then be used in Apollo queries and mutations.
