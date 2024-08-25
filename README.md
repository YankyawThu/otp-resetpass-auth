## Installation

**Copy *.env.example* to *.env* file. And then you need to setup for mail and database. I use Postgresql for database and Google for mail service. There will be different what tech you will use. If you use postgresql, the url looks like *postgres://db_username:db_password@localhost:5432/db_name* and for mail service you need to create *app password* in google setting [there](https://myaccount.google.com/apppasswords)**

### Steps

1. Install node_modules
    ```bash
    npm install
    ```

2. Migrate database with prisma
    ```bash
    npx prisma migrate dev
    ```

3. If require
    ```bash
    npx prisma generate
    ```

4. Run development server
    ```bash
    npm run dev
    ```