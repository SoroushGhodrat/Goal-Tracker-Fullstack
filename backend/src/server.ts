const express = require("express");
import mongoose from "mongoose";
import goalsRoutes from "./routes/goalsRoutes";
import errorHandler from "./middleware/errorMiddleware";
import usersRoutes from "./routes/usersRoutes";
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/goals", goalsRoutes);

app.use("/api/users", usersRoutes);

app.use(errorHandler);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@merngoalscluster.fuzvwff.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    app.listen(`${process.env.PORT}`, () => {
      console.log(
        `\nServer Status: \n🔌 Connected To MongoDB\n🎧 Server is running on http://localhost:${process.env.PORT}\n`,
      );
    });
  })
  .catch((error) => console.log("Error: ", error));
