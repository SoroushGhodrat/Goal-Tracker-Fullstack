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
   📄 API documents: http://localhost:5000/api-docs/
   ```

### Restart Server in case of any error:

   - In case of any errors, the server can be restarted by typing `rs` in the terminal and pressing Enter.


###  Backend Authentication:
   - This project utilizes token-based authentication (via the protect middleware) for certain routes. To test these APIs through Postman, ensure to add the token to the "Bearer Token" field under the "Auth" tab when testing protected routes.

   ### API Documentation with Swagger

   This project uses [Swagger](https://swagger.io/) for documenting RESTful APIs to help developers to understand and interact with the API.

   To view the API documentation:

   - Start the backend server by executing `npm run server` in a separate terminal.
   - Open a web browser and navigate to `http://localhost:5000/api-docs/`.

   The Swagger UI will be displayed, showing a list of all available API endpoints. You can expand each endpoint to see its details, including the expected request format and the response format. You can also try out the endpoints directly from the Swagger UI.

   For endpoints that require authentication, you'll need to provide a Bearer token. Click on the "Authorize" button at the top of the Swagger UI, enter the Bearer token in the input field, and click "Authorize" to close the dialog. Your Bearer token will be included in the `Authorization` header of all subsequent requests made from the Swagger UI.

You can locate and copy the Bearer token from the console. It will appear in the format: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

Please ensure to copy the entire string, including the `Bearer` prefix, but without the quotation marks ("").

If you wish to test the endpoint with Postman, you only need to copy and paste the token part of the string, i.e., the part after `Bearer `, which looks like `eyJhbGciOiJIU...`.

###  Security Section

- [bcrypt.js](https://www.npmjs.com/package/bcryptjs): A library for hashing and salting passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): A library for generating JSON Web Tokens (JWT) for user authentication.
