# Docker Setup for Suno Music Prompt Helper

This document provides instructions for running the Suno Music Prompt Helper application using Docker containers.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

The application is containerized with Docker and consists of:

- **Frontend**: React.js application served by Nginx in production
- **Backend**: Node.js/Express.js API server
- **Database**: MongoDB Atlas (cloud-hosted)

## Quick Start

### Development Environment

To start the application in development mode:

```bash
# Start the application with hot-reloading
docker-compose -f docker-compose.yml -f docker-compose.override.yml up

# Build and start the application in detached mode
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

In development mode:

- Frontend is available at `http://localhost:3001`
- Backend is available at `http://localhost:5000`
- Code changes will automatically trigger rebuilds (hot-reloading)

### Production Environment

To deploy the application for production:

```bash
# Set up production environment variables
cp production.env .env
# Edit .env with your production credentials

# Build and start the application
docker-compose up --build -d

# Stop the application
docker-compose down
```

In production mode:

- Frontend is available at `http://localhost:3001` (served by Nginx)
- Backend is available at `http://localhost:5000`
- API requests from the frontend to the backend are proxied through Nginx

## Environment Variables

Configure the application by setting environment variables in the `.env` file:

- `MONGODB_URI`: Connection string for MongoDB Atlas
- `JWT_SECRET`: Secret key for JWT token generation
- `GROQ_API_KEY`: API key for GROQ service
- `NODE_ENV`: Set to `development` or `production`

## Container Management

```bash
# View running containers
docker-compose ps

# Restart a specific service
docker-compose restart backend

# View logs from a specific service
docker-compose logs frontend

# Rebuild a specific service after code changes
docker-compose build frontend
docker-compose up -d
```

## Updating the Application

To update the application with new code changes:

```bash
# Pull the latest code changes
git pull

# Rebuild and restart the containers
docker-compose up --build -d
```

## Database Backups

Since we're using MongoDB Atlas, backups are managed through the Atlas dashboard. However, you can create a database dump using:

```bash
# SSH into the backend container
docker-compose exec backend /bin/sh

# Use mongodump to create a backup (requires MongoDB tools)
mongodump --uri "$MONGODB_URI" --out /app/backup/$(date +%Y-%m-%d)
```

## Troubleshooting

### Container Won't Start

Check the logs for detailed error messages:

```bash
docker-compose logs
```

### Database Connection Issues

1. Verify that the MongoDB Atlas IP whitelist includes your server's IP address
2. Check the `.env` file for correct MongoDB URI

### Port Conflicts

If ports 3000 or 5000 are already in use, change them in the `docker-compose.yml` file:

```yaml
ports:
  - "3001:80"  # Change 3000 to another port
```

## Security Considerations

1. Never commit `.env` files with real credentials to version control
2. Regularly update Docker images to patch security vulnerabilities
3. Use strong, unique passwords for MongoDB Atlas
4. Consider implementing rate limiting for API endpoints

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
