import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import sequelize from "./databases/db.js";
import usersRouter from "./routes/users.js";
import { setupSwagger } from "./swagger.js";


//dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(express.json());

setupSwagger(app);

// rotas
app.use("/users", usersRouter);

// rota teste
app.get("/test", (req, res) => {
  res.json({ ok: true, now: new Date().toISOString() });
});


async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("db conectado");

    app.listen(PORT, () => {
      console.log(`server rodando em http://localhost:${PORT}`);
      console.log(`swagger docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("erro ao conectar com o banco de dados:", err);
    process.exit(1);
  }
  
}

bootstrap()