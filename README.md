# Task Management RESTful API

A simple RESTful API built with **Node.js** and **Express.js** to manage tasks (to-do items).  
This API supports **CRUD operations**, **pagination**, **sorting**, **filtering**, and **role-based authentication & authorization**.
---
## Features

- **CRUD operations** for tasks:
  - `GET /tasks` – Retrieve all tasks
  - `GET /tasks/:id` – Retrieve a task by ID
  - `POST /tasks` – Create a new task
  - `PUT /tasks/:id` – Update an existing task
  - `DELETE /tasks/:id` – Delete a task (admin only)

- **Validation**: Title and description are required.  
- **Pagination, Sorting, Filtering**:
  - Pagination: `page` and `limit` query parameters
  - Sorting: `sort` and `order` query parameters
  - Filtering: `title` and `description` query parameters
- **Authentication & Authorization**:
  - JWT-based authentication
  - Role-based authorization: only `admin` can delete tasks
- **Error handling**: Proper status codes (400, 401, 403, 404, 500)

---

## Installation

1. Clone the repository:

git clone https://github.com/arjshreya/osumare-backend-assignment.git
cd backend-assignment

2. Install dependencies:
npm install

3.Start the server:
node Server.js

4. Server will run at:
http://localhost:5000

## Authentication
POST /login – Login to get a JWT token

Request:

{
  "username": "admin",
  "password": "admin123"
}


Response:

{
  "token": "<JWT_TOKEN>"
}

## API Endpoints
Tasks (Protected Routes)

GET /tasks

Retrieve all tasks
Supports pagination, sorting, and filtering.

Example Request:

GET /tasks?page=1&limit=5&sort=title&order=asc&title=buy&description=shoes
Headers: Authorization: Bearer <JWT_TOKEN>

GET /tasks/:id

Retrieve a specific task by its ID.

POST /tasks

Add a new task.
Request Example:
{
  "title": "Buy groceries",
  "description": "Buy milk and bread"
}

PUT /tasks/:id

Update an existing task by its ID.

Request Example:

{
  "title": "Buy shoes",
  "description": "Running shoes from Nike"
}

DELETE /tasks/:id

Delete a task by its ID.
Only accessible by users with the admin role.

## Pagination, Filtering, and Sorting

The `/tasks` endpoint supports **pagination**, **filtering**, and **sorting** to efficiently manage and retrieve task data.
| Parameter  | Type   | Default  | Description                            |
|------------|--------|----------|----------------------------------------|
| `page`     | Number | 1        | Specifies the page number to retrieve  |
| `limit`    | Number | 10       | Specifies the number of tasks per page |

**Example Request:**
GET /tasks?page=2&limit=5

This retrieves 5 tasks per page and returns the second page of results.

---

###  Filtering
Filtering allows users to search tasks based on **title** or **description** keywords.

| Parameter     | Type   | Description                                                        |
|---------------|--------|--------------------------------------------------------------------|
| `title`       | String | Filters tasks that contain the specified text in their title       |
| `description` | String | Filters tasks that contain the specified text in their description |

**Example Request:**
GET /tasks?title=buy&description=shoes

This returns tasks whose titles include “buy” and whose descriptions include “shoes”.

---

###  Sorting
Sorting lets users order the results based on a particular field (like `id` or `title`) in ascending or descending order.

| Parameter | Type   | Values                       | Description                          |
|-----------|--------|------------------------------|--------------------------------------|
| `sort`    | String | `id`, `title`, `description` | Field to sort by                     |
| `order`   | String | `asc`, `desc`                | Sort order — ascending or descending |

**Example Request:**
GET /tasks?sort=title&order=asc

This returns all tasks sorted alphabetically by title in ascending order.

---

### Combined Example
You can use **pagination**, **filtering**, and **sorting** together:
GET /tasks?page=1&limit=5&sort=id&order=desc&title=buy

This request:
- Retrieves page 1 of the results  
- Limits output to 5 tasks  
- Sorts tasks by `id` in descending order  
- Filters tasks whose titles include “buy”

##  Authentication & Authorization

Use the `/login` endpoint to obtain a **JWT token**.

Include the token in every protected request header:
Authorization: Bearer <JWT_TOKEN>


###  Roles and Permissions

- **Admin users** can **view, create, update, and delete** tasks.  
- **Regular users** can **view, create, and update** tasks — but **cannot delete**.

---

### Users (for Testing)

| Username  | Password   | Role  |
|-----------|------------|-------|
| admin     | admin123   | admin |
| user      | user123    | user  |

---

## Testing the API

You can test the API easily using **Postman** or **curl**.

1. **Login using `/login`** to get a JWT token.  
2. Copy the token from the response.  
3. Add the token to the request header for all protected routes:
Authorization: Bearer <your_token>
4. Use endpoints like:
   - `GET /tasks`
   - `GET /tasks/:id`
   - `POST /tasks`
   - `PUT /tasks/:id`
   - `DELETE /tasks/:id` (admin only)

---

##  Error Handling

The API returns clear and consistent error messages with proper HTTP status codes.

| Status Code | Meaning               | Description                               |
|-------------|-----------------------|-------------------------------------------|
| 400         | Bad Request           | Missing or invalid input                  |
| 401         | Unauthorized          | Missing token                             |
| 403         | Forbidden             | Invalid token or insufficient permissions |
| 404         | Not Found             | Task not found                            |
| 500         | Internal Server Error | Unexpected issue on the server            |

---

## 📄 Technologies Used

- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**
- **Nodemon** (for development)

---

## 👨‍💻 Author

**Your Name**  
📧 [your-email@example.com](mailto:your-email@example.com)  
🔗 [GitHub Profile](https://github.com/your-github-username)

---

## 🏁 Conclusion

This project demonstrates how to:

- Build a **RESTful API** with Express.js  
- Implement **CRUD operations**  
- Use **JWT-based authentication & role-based authorization**  
- Support **pagination, sorting, and filtering** for flexible task retrieval  
- Handle errors gracefully with clear response codes  

---

> 💡 *Developed as part of an assignment for Osumare Marketing Solutions Pvt. Ltd.*

