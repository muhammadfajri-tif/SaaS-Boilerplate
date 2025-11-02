# Express API Server

This is the Express.js API server for the SaaS Boilerplate application. It provides REST API endpoints for posts, tags, and comments functionality.

## Setup

1. **Environment Variables**: Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**: Make sure your PostgreSQL database is running and the `DATABASE_URL` in `.env` is correct.

## Development

Start the development server:
```bash
npm run dev
```

The server will run on port 3001 by default.

## Available Endpoints

### Health Check
- `GET /health` - Server health check

### Posts
- `GET /api/posts` - Get all posts with tags and comments
- `POST /api/posts` - Create a new post
- `GET /api/posts/:postId` - Get a specific post
- `PUT /api/posts/:postId` - Update a post
- `DELETE /api/posts/:postId` - Delete a post

### Comments
- `POST /api/posts/:postId/comments` - Create a comment on a post
- `GET /api/posts/:postId/comments` - Get all comments for a post

### Tags
- `GET /api/tags` - Get all tags

## Authentication

Currently, the API expects a `x-user-id` header or `userId` in the request body for authenticated operations. In a production environment, this should be replaced with proper JWT token validation or session management.

## Error Handling

The API returns consistent error responses in the format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

## Success Responses

Success responses follow this format:
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

## Database Schema

The server uses Drizzle ORM with the following main tables:
- `posts` - Blog posts
- `tags` - Post tags
- `comments` - Post comments
- `post_tags` - Many-to-many relationship between posts and tags

## Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```
