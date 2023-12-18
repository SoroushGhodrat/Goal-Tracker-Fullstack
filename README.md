## Table of Contents



1. [ Project Setup and Execution](#project-setup-and-execution)
   - [ Installation](#installation)
   - [ Running the Frontend](#running-the-frontend)
   - [ Running the Backend](#running-the-backend)
   - [ Restart Server](#restart-server)
   - [ Token-Based Authentication](#token-based-authentication)
   - [ API Documentation using Swagger](#api-documentation-using-swagger)
2. [ Security](#essential-libraries-for-security)
3. [ Technologies Used](#technologies-used)

## Project Setup and Execution



### Installation

Execute `npm install` to install all necessary dependencies for both the backend and frontend of the project.

### Running the Frontend

Initiate the frontend by executing `npm run dev` in the first terminal.

### Running the Backend

Start the backend server by executing `npm run server` in a separate terminal. Upon successful startup, the following message will be displayed in the terminal:

```sh
Server Status:
🔌 Connected To MongoDB
🎧 Server is running on http://localhost:5000
📄 API documents: http://localhost:5000/api-docs/
```

### Restart Server

Should you encounter any errors, you can easily restart the server. Simply type `rs` into the terminal and hit the `Enter` key. This command will trigger a server reboot, potentially resolving any temporary issues.

### Setting Up MongoDB for Local Backend Development

Follow these steps to set up your own MongoDB database for running the backend on your local machine:

1. Create a MongoDB account if you don't already have one. You can sign up for a free account.

2. Log in to your MongoDB account and create a new database.

3. Set up the database username, password, and database name.

4. In the root of the backend folder, create a `.env` file to store your private database information. Use the following format:

```env
NODE_ENV=development
PORT=5000
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-jwt-secret>  # e.g., saMplE123
```

### Token-Based Authentication

---

This project utilizes token-based authentication (via the protect middleware) for certain routes. To test these APIs through Postman, ensure to add the token to the "Bearer Token" field under the "Auth" tab when testing protected routes.

### API Documentation Using Swagger

---

This project utilizes Swagger for the documentation of its RESTful APIs. To access the API documentation, ensure the backend server is running and visit http://localhost:5000/api-docs/ on your web browser.

**❗Important Note:** Some endpoints require authentication and will need a **_Bearer token_**. To provide this, click the "Authorize" button at the top of the Swagger UI, input the Bearer token in the provided field, and click "Authorize" again to close the dialog. This will include your Bearer token in the Authorization header for all subsequent requests made from the Swagger UI.

The Bearer token is displayed in the console in the format:
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....`. Ensure to copy the entire string, including the `Bearer` prefix, but excluding the quotation marks ("").

To test the endpoint with Postman, only the token part of the string is needed, i.e., the part following `Bearer`, which appears like `eyJhbGciOiJIU...`.

### Essential Libraries for Security

---

- **Bcrypt**: This is a robust library used for hashing and salting passwords, providing a secure way to store user passwords.
- **JSON Web Token**: This library is essential for generating JSON Web Tokens (JWT). JWTs are used for user authentication, ensuring secure transmission of information.

### Technologies Used

---

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **React.js**: A JavaScript library for building UI.
- **TypeScript**: To add static type definitions.
- **MongoDB**: A source-available cross-platform document-oriented database program.
