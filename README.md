# <center>Project Pineapple</center>

Backend of the project [Pineapple](https://github.com/momu54/pineapple).

## Features

-   Review shorts channels sent by Pineapple

## Deployment

### Requirements

-   Node.js latest
-   pnpm package manager
-   Sqlite3

1. Clone the repository
2. Install dependencies

    ```bash
    pnpm install
    ```

3. Set up the database

    ```bash
    sqlite3 database/data.db < database/table.sql
    ```

4. Set up the environment variables

    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file to match your configuration.

5. Run the server

    ```bash
    pnpm start
    ```

    The server will be running on `https://localhost:9443`.

6. Run review mode
    ```bash
    pnpm review
    ```
    Review mode can be run without stopping the server.
