# The Good Corner

Live coding project for Wild Code School, work-and-study program, 2023-2024:

- Language: TypeScript
- Back-end and API: Node.js Apollo server exposing an GraphQL API using models decorated with type-graphql and TypeORM (Postgres database)
- Web-app: Next.js pages (React with styled-components), Apollo client and automatic type generation from GraphQL API
- All services in Docker containers orchestrated with Docker Compose
- Unit and integration tests (Jest, Apollo client mock, test database)
- Continuous integration quality check

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
