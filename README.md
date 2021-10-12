This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# Orgu

## Getting Started

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL="postgresql://postgres:1234@localhost:6432/orgu"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=orgu
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL="postgresql://postgres:1234@localhost:6433/orgu"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=orgu
```

## Tests

Runs your tests using Jest.

```
yarn test
```

## Local Docker Postgres Database

### Connect

```
sudo docker exec -it orgu_db_1 psql -U postgres
```

### Execute Script

```
cat data.sql | sudo docker exec -i orgu_db_1 psql -U postgres orgu
```
