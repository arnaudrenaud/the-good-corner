# The Good Corner

Live coding project for Wild Code School, work-and-study program, 2023-2024:

- Language: TypeScript
- Web-app: React (Next.js)
- Back-end: Node.js server with an Apollo GraphQL API and TypeORM with a Postgres database
- All services containerized with Docker, Docker Compose

_Prerequisites: Docker (24+), Make._

## Development

Run app in watch mode:

```
make run-dev
```

In parallel, follow log output with:

```
make logs
```

### Run tests

#### Back end

Run tests in watch mode:

```
make back-end-test-watch
```

#### Web app

Run tests in watch mode:

```
make web-app-test-watch
```

### Setting web-app types after GraphQL

Generate query-specific types for web-app development:

```
make web-app-generate-graphql-types
```

These types can then be used in Apollo queries and mutations.
