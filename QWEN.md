# Qwen Code Context

## Project Overview

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that serves as a portfolio website. The project uses:

- Next.js 15 with App Router
- Sanity CMS for content management
- Tailwind CSS for styling
- TypeScript for type safety
- Docker for containerization

The architecture includes:
- A Next.js frontend application
- A Sanity Studio for content management
- A Docker setup for both development and production

## Building and Running

### Development
To start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start both the web application and Sanity studio in development mode.

### Production
To build for production:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

### Testing
To run linting:
```bash
npm run lint
```

## Development Conventions

- Uses TypeScript with strict typing
- Follows Next.js App Router conventions
- Uses Tailwind CSS for styling with custom configuration
- Uses Prettier for code formatting
- Uses ESLint for code quality
- Uses Sanity for content management with internationalization support
- Uses Docker for containerization
- Uses concurrently for running multiple development processes

## Key Technologies

- Next.js 15 with App Router
- Sanity CMS
- Tailwind CSS
- TypeScript
- Docker
- Concurrently
- Prettier
- ESLint

## Project Structure

The project has the following key directories and files:
- `src/` - Source code directory
- `app/` - Next.js App Router pages
- `public/` - Public static files
- `sanity.config.js` - Sanity Studio configuration
- `tailwind.config.mjs` - Tailwind CSS configuration
- `next.config.mjs` - Next.js configuration
- `Dockerfile` - Docker container configuration
- `docker-compose.yml` - Docker Compose configuration

## Deployment

The project is designed to be deployed using Docker with the following configuration:
- Uses standalone output for Next.js
- Multi-stage Docker build
- Production environment setup
- Port 3000 exposed for the application

## Code Quality

The project enforces code quality through:
- ESLint with Next.js core web vitals and Prettier configuration
- Prettier with specific formatting rules
- TypeScript type checking
- Tailwind CSS configuration with custom font families

## Contributing

The project follows standard Next.js and React conventions with:
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Prettier for code formatting
- Docker for containerization

## Additional Notes

The project uses `@sanity/document-internationalization` and `sanity-plugin-internationalized-array` for internationalization support, indicating it's designed to support multiple languages (English and French).

The `next.config.mjs` is configured to automatically optimize and load fonts from Vercel's font library (Geist) and to use a standalone output for production builds.

The `tailwind.config.mjs` includes custom font family configurations and font sizes for different content types.