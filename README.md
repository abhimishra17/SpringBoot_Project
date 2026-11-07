# Spring Boot Cloud Vendor API

This project exposes CRUD endpoints for cloud vendors at `/cloudvendor`.

## Run locally

Requires Java 17 or newer and Maven. The default configuration uses an in-memory
H2 database, so no database setup is needed:

```sh
mvn spring-boot:run
```

To use MySQL, create the `rest_demo` database, set `DB_USERNAME` and
`DB_PASSWORD`, then start with the MySQL profile:

```sh
SPRING_PROFILES_ACTIVE=mysql mvn spring-boot:run
```

The database URL can be overridden with `DB_URL`. The API supports `GET`,
`POST`, `PUT`, and `DELETE` on `/cloudvendor` and `/cloudvendor/{vendorId}`.