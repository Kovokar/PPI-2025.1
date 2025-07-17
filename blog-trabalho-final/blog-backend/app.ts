import "dotenv/config"; // Carrega variáveis de ambiente do .env
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes"; // Importar as rotas de postagem
import commentRoutes from "./routes/commentRoutes"; // Importar as rotas de comentário
import userRoutes from "./routes/userRoutes"; // Importar as rotas de usuário
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger"; // Importar as especificações do Swagger

const app = express();

// Configurações do Express
app.use(express.json());
app.use(cors());

// Montar os módulos de rota sob o prefixo /socialifpi
app.use("/socialifpi", postRoutes);
app.use("/socialifpi", commentRoutes);
app.use("/socialifpi", userRoutes);

// Rota para a documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Inicializar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Não encontrado");
});
