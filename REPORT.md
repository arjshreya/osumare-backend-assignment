##  REPORT.md 

#  Project Report – Task Management RESTful API

##  Objective
The goal of this project was to design and implement a simple Task Management RESTful API using Node.js and Express.js, demonstrating CRUD operations, authentication, authorization, and data handling with pagination, sorting, and filtering.

---

##  Approach

1. Environment Setup
   - Initialized project using   `npm init -y`
   - Installed `express` and `jsonwebtoken` for server and authentication
   - Created `Server.js` to handle routes and logic

2. In-Memory Storage
   - Used a JavaScript array `tasks[]` to temporarily store task objects.
   - Each task has:
     ```json
     { id, title, description }
     ```

3. Authentication
   - Implemented `/login` route using **JWT tokens**
   - Users are hardcoded:
     ```json
     {
       admin: admin123 (role: admin)
       user: user123 (role: user)
     }
     ```
   - Token contains user role for access control.

4. Authorization
   - Middleware `tokenAuthentication()` verifies JWT tokens.
   - Middleware `roleAuthorization(role)` ensures only admins can delete tasks.

5. CRUD Functionality
   - Implemented `GET`, `POST`, `PUT`, and `DELETE` routes.
   - Added data validation (title and description required).

6. Pagination, Sorting & Filtering
   - Pagination implemented using query parameters `page` and `limit`.
   - Sorting via `sort` and `order`.
   - Filtering based on `title` or `description` substring matching.

7. Error Handling
   - All routes handle invalid inputs, missing tokens, and incorrect roles gracefully using appropriate HTTP status codes.

---

##  Algorithms Used

1️. Filtering
Used `Array.filter()` with case-insensitive search:

filteredTasks = tasks.filter(t =>
  t.title.toLowerCase().includes(title.toLowerCase()) &&
  t.description.toLowerCase().includes(description.toLowerCase())
);

2️. Sorting

Used Array.sort():

filteredTasks.sort((a, b) => {
  if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
  if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
  return 0;
});

3️. Pagination

Used Array.slice() to limit results:

const paginatedTasks = filteredTasks.slice((page - 1) * limit, page * limit);

- Results

Successfully implemented full CRUD operations.

Added secure login and role-based access control.

Achieved flexible task retrieval using pagination, filtering, and sorting.

- Tools & Technologies
----------------------------------------------------
|Tool	             |   Purpose                     |
----------------------------------------------------
|Node.js 	       | Backend runtime               |
|Express.js 	    | Web framework                 |
|JWT (jsonwebtoken)| Authentication                |
|Nodemon	          | Auto-reload during development|
|Postman           | API testing                   |
----------------------------------------------------

- Challenges Faced

Ensuring proper JWT authentication flow.

Implementing filtering and sorting efficiently.

Handling edge cases for missing or invalid input.

- Conclusion

This project demonstrates the ability to:

Build REST APIs using Express.js

Implement authentication and role-based access control

Use query-based filtering, sorting, and pagination

Handle errors gracefully with clear response codes

The implementation fulfills all assignment requirements effectively.

Submitted By:
- Shreya Arjugade
- arjshreya1625@gmail.com

GitHub: arjshreya/osumare-backend-assignment