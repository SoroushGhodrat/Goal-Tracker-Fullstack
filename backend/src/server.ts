import express from "express";
import mongoose from "mongoose";
import goalsRoutes from "./routes/goalsRoutes";
import errorHandler from "./middleware/errorMiddleware";
import usersRoutes from "./routes/usersRoutes";
import swaggerDocs from "./swagger/swagger";
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());

// API codumentation
swaggerDocs(app);

// !!! CORS error handling must be before routes to avoid CORS error otherwise it will not work
// Middleware to handle CORS and parse JSON
app.use((req, res, next) => {
  // Allow requests from any origin (you can specify your origin if needed)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Define the allowed HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  // Define the allowed headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  next();
});

app.use("/api/goals", goalsRoutes);

app.use("/api/users", usersRoutes);

app.use(errorHandler);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@merngoalscluster.fuzvwff.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    app.listen(`${process.env.PORT}`, () => {
      console.log(
        `\nServer Status: \n🔌 Connected To MongoDB\n🎧 Server is running on http://localhost:${process.env.PORT}\n📄 API documents: http://localhost:5000/api-docs/\n`,
      );
    });
  })
  .catch((error) => console.log("Error: ", error));
