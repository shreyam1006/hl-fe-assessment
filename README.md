# Setup Guide

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Postman (for API mocking)

## API Mock Server

The application uses a Postman mock server for API endpoints.

Base URL: `https://9d07abe9-2b20-4809-9ba8-9e42900ba0c8.mock.pstmn.io`

### Endpoints

1. Order API

   ```
   POST /api/order
   ```

2. Set Rooms API
   ```
   POST /api/set-rooms
   ```

### Postman Setup

1. Import the collection into Postman
2. Create mock responses for each endpoint
3. Ensure the mock server is running before starting the application

## Installation

1. Clone the repository
2. Navigate to project directory
3. Install dependencies:

```bash
npm install
```

## Available Scripts

### Development Server

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

Creates optimized production build in `build` folder
