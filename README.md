# The Good Corner

## Development

### Installing dependencies

```
cd back-end
npm install
cd ..
cd web-app
npm install
cd ..
```

### Running back-end server

```
cd back-end
npm run dev
```

### Running web-app server

```
cd web-app
npm run dev
```

### Setting web-app types after GraphQL

Generate query-specific types for web-app development:

```
cd web-app
npm run graphql-codegen
```

These types can then be used in Apollo queries and mutations.
