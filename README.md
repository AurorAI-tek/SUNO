# Suno Music Prompt Helper

A full-stack web application designed to help users explore and utilize Suno's music generation features, with a focus on meta tags and advanced customization options.

## Features

- **Comprehensive Meta Tags Library**: Browse and search through a complete collection of Suno meta tags with detailed explanations, syntax guides, and practical examples.
- **Advanced Features Documentation**: Learn about Suno's powerful features with step-by-step guides and examples.
- **AI Assistant**: Get real-time help with crafting prompts, analyzing existing ones, and generating new ideas using the integrated GROQ API.
- **Admin Panel**: Secure administrator interface for managing meta tags and features content.

## Tech Stack

### Frontend

- React.js with Vite
- Tailwind CSS with DaisyUI components
- React Router for navigation
- Axios for API requests

### Backend

- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- GROQ SDK for AI capabilities

## Getting Started

### Prerequisites

#### Standard Installation

- Node.js (v18 or later)
- MongoDB (local or Atlas)
- GROQ API key

#### Docker Installation

- Docker and Docker Compose
- GROQ API key

### Installation

#### Traditional Setup

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd suno-music-prompt-helper
   ```

2. Install dependencies for both client and server

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create `.env` file in the server directory with the following variables:

   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   GROQ_API_KEY=<your-groq-api-key>
   ```

4. Seed the database with initial data

   ```bash
   cd server
   node utils/seeder.js
   ```

5. Start the development servers

   ```bash
   # Start the backend server
   cd server
   npm start

   # In a separate terminal, start the frontend
   cd client
   npm run dev
   ```

#### Docker Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd suno-music-prompt-helper
   ```

2. Create `.env` file in the root directory with the required environment variables:

   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   GROQ_API_KEY=<your-groq-api-key>
   ```

3. Start the application using Docker Compose:

   ```bash
   # Development mode with hot-reloading
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
   
   # OR Production mode
   docker-compose up --build -d
   ```

4. Open your browser and navigate to [`http://localhost:3000`](http://localhost:3000)

For detailed Docker instructions, see [DOCKER.md](DOCKER.md)

## Project Structure

```text
suno-music-prompt-helper/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── admin/      # Admin panel components
│   │   │   ├── layout/     # Layout components (Navigation, Footer)
│   │   │   ├── pages/      # Page components
│   │   │   └── utils/      # Utility components
│   │   ├── config/         # Configuration files
│   │   ├── context/        # React context providers
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── Dockerfile          # Production Docker configuration
│   └── Dockerfile.dev      # Development Docker configuration
│
├── server/                 # Backend Node.js application
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions and scripts
│   ├── Dockerfile          # Docker configuration
│   └── server.js           # Server entry point
│
├── docker-compose.yml      # Docker Compose production configuration
├── docker-compose.override.yml # Docker Compose development overrides
├── .env                    # Environment variables (do not commit)
├── production.env          # Production environment template
├── DOCKER.md               # Docker documentation
└── README.md               # Project documentation
```

## Admin Access

The database seeder creates an initial admin user:

- Email: admin@example.com
- Password: adminpassword

You can use these credentials to log in to the admin panel at `/admin/login`.

## Deployment

### Traditional Deployment

For production deployment without Docker:

1. Build the frontend

   ```bash
   cd client
   npm run build
   ```

2. Configure your server to serve the static files from `client/dist`

3. Start the Node.js server in production mode

   ```bash
   cd server
   NODE_ENV=production npm start
   ```

### Docker Deployment

For production deployment with Docker:

1. Update production environment variables

   ```bash
   cp production.env .env
   # Edit .env with your production values
   ```

2. Build and start the Docker containers

   ```bash
   docker-compose up --build -d
   ```

3. Your application will be available at `http://your-server-ip:3000`

For more detailed Docker deployment options, refer to [DOCKER.md](DOCKER.md)

## License

This project is licensed under the MIT License.

## Disclaimer

This application is not officially affiliated with Suno. It is an independent educational resource created to help users better understand and utilize Suno's features.
