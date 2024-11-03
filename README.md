# Express Backend Boilerplate

This is a starter project for building an Express.js backend with JWT-based authentication, secure routes, and Prisma ORM integration, using PostgreSQL as the database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [License](#license)

## Features

- **JWT Authentication**: Secure authentication system using JSON Web Tokens.
- **Protected and Public Routes**: Access control with protected routes for authorized users only.
- **User Authentication**: Signup, Signin, and Logout functionality.
- **Token Refresh Mechanism**: Refresh expired tokens to maintain user sessions.
- **Prisma ORM**: Type-safe database access with Prisma, connected to `PostgreSQL`.
- **Data Validation**: Zod for schema validation on both client and server.

## Technologies Used

- **Express**: Web framework for Node.js.
- **Prisma**: ORM for type-safe database access, configured for PostgreSQL.
- **Passport JWT**: Authentication middleware for handling JSON Web Tokens.
- **JWT**: JSON Web Token for securing API requests.
- **Zod**: Type-safe schema validation.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/IronJosh786/ts-express-server.git
   cd ts-express-server
   ```

2. **Environment Variables**:

   Create a `.env` file in the root directory with the following keys:

   ```bash
   PORT=3000                              # Port on which the server will run
   APP_URL=http://localhost:5173          # URL of the client application
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname   # PostgreSQL connection string
   NODE_ENV=development                   # Set to "development" or "production"
   ACCESS_TOKEN_SECRET=secret_string      # Secret key for signing access tokens
   REFRESH_TOKEN_SECRET=another_secret_string  # Secret key for signing refresh tokens
   ACCESS_TOKEN_EXPIRY=10m                # Access token expiration time, e.g. "10m" for 10 minutes
   ACCESS_TOKEN_COOKIE_EXPIRY=600000      # Access token cookie expiration time in milliseconds (e.g. 10m in ms)
   REFRESH_TOKEN_EXPIRY=30m               # Refresh token expiration time, e.g. "30m" for 30 minutes
   REFRESH_TOKEN_COOKIE_EXPIRY=1800000    # Refresh token cookie expiration time in milliseconds (e.g. 30m in ms)
   ```

3. **Install dependencies**:

   ```bash
     npm i
   ```

4. **Setup Database with Prisma**:

   ```bash
     npx prisma init
     npx prisma migrate dev --name init
     npx prisma generate
   ```

5. **Run the server**:

   ```bash
     npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
