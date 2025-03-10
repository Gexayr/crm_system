# CRM System

A modern Customer Relationship Management (CRM) system built with Node.js, React, and PostgreSQL.

## Features

- User Authentication & Authorization
- Customer Management
- Lead Management
- Activity Tracking
- Payment Processing
- Real-time Updates
- Analytics & Reporting
- Role-based Access Control

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Redis
- Socket.io
- JWT Authentication

### Frontend (Coming Soon)
- React
- Redux
- Material-UI
- Chart.js
- React Router
- Axios

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crm
   ```

2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

3. Update the environment variables in `.env` with your configuration

4. Start the development environment using Docker:
   ```bash
   docker-compose up
   ```

   Or run locally:
   ```bash
   npm install
   npm run dev
   ```

5. The API will be available at `http://localhost:5000`

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/refresh - Refresh access token

### Customers
- GET /api/customers - List all customers
- POST /api/customers - Create a new customer
- GET /api/customers/:id - Get customer details
- PUT /api/customers/:id - Update customer
- DELETE /api/customers/:id - Delete customer

### Leads
- GET /api/leads - List all leads
- POST /api/leads - Create a new lead
- GET /api/leads/:id - Get lead details
- PUT /api/leads/:id - Update lead
- DELETE /api/leads/:id - Delete lead

### Activities
- GET /api/activities - List all activities
- POST /api/activities - Create a new activity
- GET /api/activities/:id - Get activity details
- PUT /api/activities/:id - Update activity
- DELETE /api/activities/:id - Delete activity

## Development

### Database Migrations

```bash
# Create a migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo
```

### Running Tests

```bash
npm test
```

## Docker Support

The application includes Docker support for easy development and deployment:

```bash
# Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 