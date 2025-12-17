# NovaTech API Specification

API documentation for backend services (future implementation).

## Overview

**Base URL**: `https://api.novatech.example/v1`

## Authentication

Authenticated endpoints require a Bearer token:

```
Authorization: Bearer <token>
```

## Endpoints

### Contact Form

#### Submit Contact Form

```
POST /contact
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "service": "consulting",
  "message": "I'd like to discuss a project..."
}
```

**Response (201 Created):**

```json
{
  "id": "msg_abc123",
  "status": "received",
  "message": "Thank you for your message. We'll be in touch soon."
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "validation_error",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

### Portfolio

#### Get Projects

```
GET /projects
```

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| category | string | Filter by category (web, mobile, cloud) |
| limit | integer | Number of results (default: 10) |
| offset | integer | Pagination offset |

**Response (200 OK):**

```json
{
  "projects": [
    {
      "id": "proj_001",
      "title": "FinTrack Dashboard",
      "category": "web",
      "description": "Real-time financial analytics..."
    }
  ],
  "total": 6,
  "limit": 10,
  "offset": 0
}
```

## Rate Limiting

- 100 requests per minute per IP
- 429 Too Many Requests response when exceeded

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Status

> This API is planned for future implementation. Currently, the website uses client-side simulation.
