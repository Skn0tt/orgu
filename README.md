This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# Orgu

## Setup

### Environment Variables

Create a `.env.local` file in the root directory with these environment variables:

```
DATABASE_URL="postgresql://postgres:1234@localhost:6432/orgu"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=orgu
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
BASE_URL=http://localhost:3000
```

Create a `.env.test.local` file in the root directory with these environment variables:

```
DATABASE_URL="postgresql://postgres:1234@localhost:6433/orgu"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=orgu
```

### Database

Make sure docker is running. Run:

```
npm run predev
npm run db:reset
```

## Start

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Docker Postgres Database

### Connect

```
sudo docker exec -it orgu_db_1 psql -U postgres
```

### Execute Script

```
cat data.sql | sudo docker exec -i orgu_db_1 psql -U postgres orgu
```
