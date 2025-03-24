# Location Device Management Backend

This is the backend application for the Location Device Management system, built with NestJS, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (v6 or higher)

## Getting Started

1. Navigate to the backend directory:
```bash
cd Backend/FinalLayoutBackend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/device-management
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=24h
```

4. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## Available Scripts

- `npm run start:dev` - Start the development server with hot-reload
- `npm run build` - Build the application
- `npm run start:prod` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## Tech Stack

- NestJS
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Passport.js
- Winston Logger
- Swagger/OpenAPI

## Project Structure

- `/src` - Source code
  - `/auth` - Authentication module
  - `/devices` - Device management module
  - `/users` - User management module
  - `/common` - Shared utilities and interfaces
  - `/config` - Configuration files
  - `main.ts` - Application entry point

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3001/docs
```

## Features

- User authentication and authorization
- JWT-based security
- Device management
- Location tracking
- Real-time updates
- API documentation with Swagger
- Logging system
- Error handling
- Input validation

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests: `npm run test`
4. Submit a pull request

## License

This project is private and confidential.
