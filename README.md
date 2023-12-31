## 📚 Table of Contents

1. [Project Setup and Execution](#project-setup-and-execution)
   - [Prerequisites](#prerequisites)
   - [Cloning the Project](#cloning-the-project)
   - [Setting Up MongoDB](#setting-up-mongodb-for-local-backend-development)
   - [Installation](#installation)
   - [Running the Frontend](#running-the-frontend)
   - [Running the Backend (Server)](#running-the-backend-server)
   - [Token-Based Authentication](#token-based-authentication)
   - [API Documentation using Swagger](#api-documentation-using-swagger)
2. [Security](#essential-libraries-for-security)
3. [Technologies Used](#technologies-used)

## About the Goal Tracker App

The Goal Tracker app assists users in setting and tracking their progress towards personal goals.
This application is built using a robust tech stack that includes Node.js, Express.js, MongoDB, JavaScript, React.js, TypeScript, and CSS Modules.

## Project Setup and Execution

### Prerequisites

Before you begin, ensure you have Node.js installed on your local machine. If not, you can download it from the official [Node.js website](https://nodejs.org/).

To verify if Node.js is already installed, run the following command in your terminal:

```bash
node -v
```

### Cloning the Project

To clone this project to your local machine, follow these steps:

1. Open your terminal.

2. Navigate to the directory where you want to clone the project.

3. Run the following command:

```bash
git clone https://github.com/SoroushGhodrat/Goal-Tracker-Fullstack.git
```

### Setting Up MongoDB for Local Backend Development

---

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
JWT_SECRET=<your-jwt-secret>  # e.g., secret123
```

### Installation

This project consists of a frontend and a backend, each with its own set of dependencies. To install these dependencies, you need to navigate to each directory and run the installation command:

```bash
npm install
```

### Running the Frontend

Initiate the frontend in the first terminal by executing:

```bash
npm run dev
```

### Running the Backend (server)

Start the backend server in a separate terminal by executing:

```bash
npm run server
```

Upon successful startup, the following message will be displayed in the terminal:

```sh
Server Status:
🔌 Connected To MongoDB
🎧 Server is running on http://localhost:5000
📄 API documents: http://localhost:5000/api-docs/
```

### Restart Server

Should you encounter any errors, you can easily restart the server. Simply type `rs` into the terminal and hit the `Enter` key. This command will trigger a server reboot, potentially resolving any temporary issues.

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
