## Kaushal

## 1. System Overview
This project provides a backend API that supports two types of users:

Users: Can register, log in, and upload assignments.
Admins: Can register, log in, view assignments assigned to them, and accept or reject assignments.
The backend is built using Node.js with Express and connected to a MongoDB database.

 ## 2. Prerequisites
Before setting up the system, ensure you have the following installed:

Node.js (v14 or later): Download Node.js
MongoDB: Install MongoDB
Postman or a similar API testing tool to test API endpoints.
 ##   3. Clone the Repository
Clone the repository to your local machine using git:
bash
Copy code
git clone https://github.com/yourusername/assignment-portal.git
cd assignment-portal
## 4. Setting Up the Environment
Install Dependencies:

Navigate to the project folder in your terminal and install the required dependencies:

bash
Copy code
npm install
Create a .env File:

Create a .env file in the root of your project directory and configure it as follows:

env
Copy code
MONGO_URI="mongodb://localhost:27017/assignment_portal"
JWT_SECRET="your-secret-key"
PORT=5000
MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key used to sign JWT tokens for authentication.
PORT: Port on which the server will run.
## 5. MongoDB Setup
Make sure you have MongoDB running locally or use a cloud-based service like MongoDB Atlas.

If you're running MongoDB locally, start the MongoDB server:

bash
Copy code
mongod
By default, MongoDB runs on localhost:27017.

## 6. Running the Application
Start the Server:

Run the following command to start your server:

bash
Copy code
npm start
This will start the server on port 5000 (or the port defined in .env).

You should see the following output in your terminal:

bash
Copy code
Server running on port 5000
Testing the API:

Use an API tool like Postman or curl to test the API endpoints:

User Endpoints:

POST /api/users/register - Register a new user.
POST /api/users/login - User login.
POST /api/users/upload - Upload an assignment (requires authentication).
GET /api/users/admins - Fetch all admins.
Admin Endpoints:

POST /api/admins/register - Register a new admin.
POST /api/admins/login - Admin login.
GET /api/admins/assignments - Get all assignments assigned to the admin.
POST /api/admins/assignments/:id/accept - Accept an assignment.
POST /api/admins/assignments/:id/reject - Reject an assignment.
For the POST routes, make sure to include a valid JWT token in the Authorization header.

## 7. Project Structure
Here’s a breakdown of the key folders and files:

controllers/: Contains the logic for each API endpoint (e.g., userController.js, adminController.js).
models/: Contains the Mongoose models (User, Assignment).
routes/: Contains the route handlers for both user and admin endpoints (userRoutes.js, adminRoutes.js).
middlewares/: Contains middleware functions, such as authMiddleware for JWT authentication.
config/: Contains configuration files, such as the db.js file to connect to the MongoDB database.
app.js: The main entry point of the application where you set up Express and the database connection.
.env: The environment variables for the application (MongoDB URI, JWT secret, etc.).
 ## 8. Database Setup (MongoDB)
Create Collections:

The system will automatically create collections in MongoDB when the application starts (e.g., users, assignments).

Data Models:

User: Contains user-related information like username, password, and role (either user or admin).
Assignment: Contains assignment-related information like task, userId (who uploaded the assignment), adminId (the admin assigned to review the assignment), and the assignment's status (e.g., pending, accepted, rejected).
# 9. Testing the API (Postman Example)
Register User:

URL: POST /api/users/register
Body (JSON):
json
Copy code
{
  "username": "user1",
  "password": "password123",
  "role": "user"
}
User Login:

URL: POST /api/users/login

Body (JSON):

json
Copy code
{
  "username": "user1",
  "password": "password123"
}
Response: A JWT token will be returned, which you can use to authenticate further requests.

Upload Assignment (Authenticated User):

URL: POST /api/users/upload
Headers:
Authorization: Bearer your-jwt-token
Body (JSON):
json
Copy code
{
  "task": "Complete Node.js project",
  "admin": "admin1"
}
Admin Login:

URL: POST /api/admins/login
Body (JSON):
json
Copy code
{
  "username": "admin1",
  "password": "adminpassword"
}
View Assignments for Admin:

URL: GET /api/admins/assignments
Headers:
Authorization: Bearer your-jwt-token
Accept/Reject Assignment:

URL: POST /api/admins/assignments/:id/accept or POST /api/admins/assignments/:id/reject
Headers:
Authorization: Bearer your-jwt-token
# 10. Conclusion
You now have a fully functional backend for an Assignment Submission Portal. You can manage user registrations, login, upload assignments, and allow admins to accept or reject them. Make sure to test the API endpoints thoroughly using tools like Postman.