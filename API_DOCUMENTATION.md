# Task Management RESTful API Documentation

##  Overview
This RESTful API allows users to manage tasks through CRUD operations.  
It supports:
- JWT-based authentication  
- Role-based authorization  
- Pagination, sorting, and filtering  

---

##  Authentication

### POST `/login`
Used to obtain a JWT token for authorized API access.

#### Request Body:
json
{
  "username": "admin",
  "password": "admin123"
}
Response:
{
  "token": "<JWT_TOKEN>"
}

Notes:

Tokens are valid for 1 hour

Use the token in the header for protected routes:

Authorization: Bearer <JWT_TOKEN>

Task Management Endpoints
1️. GET /tasks

Fetch all tasks with optional pagination, sorting, and filtering.
Requires a valid JWT token.

Query Parameters:
| Parameter     | Type   | Description                                     |
| ------------- | ------ | ----------------------------------------------- |
| `page`        | number | Page number (default: 1)                        |
| `limit`       | number | Tasks per page (default: 10)                    |
| `sort`        | string | Field to sort by (`id`, `title`, `description`) |
| `order`       | string | Sort order (`asc` or `desc`)                    |
| `title`       | string | Filter by title substring                       |
| `description` | string | Filter by description substring                 |

Example Request:
GET /tasks?page=1&limit=5&sort=title&order=asc&title=buy
Authorization: Bearer <JWT_TOKEN>

Example Response:
{
  "page": 1,
  "limit": 5,
  "totalTasks": 2,
  "totalPages": 1,
  "tasks": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Buy milk and bread"
    }
  ]
}
2️. GET /tasks/:id

Fetch a specific task by its ID.

Example Request:
GET /tasks/1
Authorization: Bearer <JWT_TOKEN>

Example Response:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk and bread"
}

3️. POST /tasks

Create a new task.

Request Body:
{
  "title": "Complete backend project",
  "description": "Implement Node.js REST API"
}

Example Response:
{
  "id": 3,
  "title": "Complete backend project",
  "description": "Implement Node.js REST API"
}

4️. PUT /tasks/:id

Update an existing task.

Request Body:
{
  "title": "Buy shoes",
  "description": "Running shoes from Nike"
}

Example Response:
{
  "id": 1,
  "title": "Buy shoes",
  "description": "Running shoes from Nike"
}

5️. DELETE /tasks/:id

Delete a task (Admin only).

Example Request:
DELETE /tasks/1
Authorization: Bearer <JWT_TOKEN>

Example Response:
{
  "message": "Task deleted successfully"
}

## Roles and Permissions
Role	Permissions
Admin-	Create, Read, Update, Delete tasks
User-	Create, Read, Update tasks only

## Error Responses
|----- |--------------|----------------------------------------|
|Code  |	Message	    |  Meaning                               |
|----- |--------------|----------------------------------------|
|400	 | Bad Request  | 	Missing or invalid input             |
|401	 | Unauthorized |   No token provided                    |
|403	 | Forbidden    |	  Invalid token or insufficient rights |
|404	 | Not Found	  |   Task not found                       |
|500	 | Server Error	|   Unexpected issue                     |
----------------------------------------------------------------

🧪 Example Test Flow

Login-
POST /login with credentials to get JWT.

Use Token
Copy the token and add it to your request header.

Perform Operations

GET /tasks – View all

POST /tasks – Create

PUT /tasks/:id – Update

DELETE /tasks/:id – Delete (Admin only)

Base URL:
👉 http://localhost:5000

Developed by: Shreya Arjugade
mail- arjshreya1625@gmail.com