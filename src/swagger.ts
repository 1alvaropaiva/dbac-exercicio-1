import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "user api",
      version: "1.0.0",
      description: "api para gerenciar usuarios (table pessoas no supabase)"
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "server local de desenvolvimento"
      }
    ],
  },
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
