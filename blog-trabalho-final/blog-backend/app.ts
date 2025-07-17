import "dotenv/config";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/socialifpi", postRoutes);
app.use("/socialifpi", commentRoutes);
app.use("/socialifpi", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Não encontrado");
});
