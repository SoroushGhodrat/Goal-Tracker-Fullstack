## Project Setup and Execution

### Installation

- Execute `npm install` to install all necessary dependencies for both the backend and frontend of the project.


### Running the Frontend

- Initiate the frontend by executing `npm start` in the first terminal.

### Running the Backend

- Start the backend server by executing `npm run server` in a separate terminal.
- Upon successful startup, the following message will be displayed in the terminal:
   ```sh
      Server Status:
   🔌 Connected To MongoDB
   🎧 Server is running on http://localhost:5000
   ```

### Restart Server in case of any error:

   - In case of any errors, the server can be restarted by typing `rs` in the terminal and pressing Enter.


###  Backend Authentication:
   - This project utilizes token-based authentication (via the protect middleware) for certain routes. To test these APIs through Postman, ensure to add the token to the "Bearer Token" field under the "Auth" tab when testing protected routes.

###  Security Section

- [bcrypt.js](https://www.npmjs.com/package/bcryptjs): A library for hashing and salting passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): A library for generating JSON Web Tokens (JWT) for user authentication.
