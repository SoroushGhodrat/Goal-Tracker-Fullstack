import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swaggerDoc.json";

function swaggerDocs(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, { explorer: true })
  );
}

export default swaggerDocs;
