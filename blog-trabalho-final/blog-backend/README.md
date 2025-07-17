# SocialIFPI Blog Backend

Este é o backend da aplicação de blog SocialIFPI, construído com Node.js, Express e PostgreSQL, e desenvolvido em TypeScript. Ele fornece uma API RESTful para gerenciar postagens, comentários e usuários.

## Modelos de Dados

O projeto utiliza os seguintes modelos de dados para representar as entidades principais:

### `Usuario`

Representa um usuário do sistema.

- `id`: Identificador único do usuário (gerado automaticamente).
- `nome`: Nome do usuário.
- `email`: Endereço de email do usuário (único).
- `senha`: Senha do usuário (em um ambiente de produção, deve ser armazenada como hash).
- `created_at`: Data e hora de criação do usuário.

### `Postagem`

Representa uma postagem no blog.

- `id`: Identificador único da postagem (gerado automaticamente).
- `titulo`: Título da postagem.
- `conteudo`: Conteúdo completo da postagem.
- `data`: Data e hora da publicação da postagem.
- `curtidas`: Número de curtidas que a postagem recebeu.
- `categorias`: Array de strings para categorizar a postagem.
- `shares`: Número de vezes que a postagem foi compartilhada.

### `Comentario`

Representa um comentário em uma postagem.

- `id`: Identificador único do comentário (gerado automaticamente).
- `postId`: ID da postagem à qual o comentário pertence.
- `autor`: Nome do autor do comentário.
- `conteudo`: Conteúdo do comentário.
- `data`: Data e hora do comentário.
- `likes`: Número de curtidas que o comentário recebeu.

## Rotas da API

Todas as rotas da API são prefixadas com `http://localhost:3000/socialifpi`.

### Documentação Interativa (Swagger UI)

Você pode acessar a documentação interativa da API via Swagger UI em:
`http://localhost:3000/api-docs`

### Rotas de Postagens (`/socialifpi/postagem`)

| Método   | Rota                         | Descrição                                                                              |
| :------- | :--------------------------- | :------------------------------------------------------------------------------------- |
| `GET`    | `/postagem`                  | Lista todas as postagens. Suporta filtros por `search` (título/conteúdo) e `category`. |
| `GET`    | `/postagem/:id`              | Retorna uma postagem específica pelo ID.                                               |
| `POST`   | `/postagem`                  | Cria uma nova postagem.                                                                |
| `PUT`    | `/postagem/:id`              | Atualiza uma postagem existente pelo ID.                                               |
| `DELETE` | `/postagem/:id`              | Exclui uma postagem pelo ID.                                                           |
| `POST`   | `/postagem/:id/curtir`       | Incrementa o número de curtidas de uma postagem.                                       |
| `POST`   | `/postagem/:id/compartilhar` | Incrementa o número de compartilhamentos de uma postagem.                              |
| `POST`   | `/postagem/:id/comentarios`  | Adiciona um novo comentário a uma postagem específica.                                 |
| `GET`    | `/postagem/:id/comentarios`  | Lista todos os comentários de uma postagem específica.                                 |

### Rotas de Comentários (`/socialifpi/comentario`)

| Método   | Rota                     | Descrição                                         |
| :------- | :----------------------- | :------------------------------------------------ |
| `PUT`    | `/comentario/:id`        | Atualiza um comentário existente pelo ID.         |
| `DELETE` | `/comentario/:id`        | Exclui um comentário pelo ID.                     |
| `POST`   | `/comentario/:id/curtir` | Incrementa o número de curtidas de um comentário. |

### Rotas de Usuários (`/socialifpi/usuario`)

| Método   | Rota           | Descrição                              |
| :------- | :------------- | :------------------------------------- |
| `GET`    | `/usuario`     | Lista todos os usuários.               |
| `GET`    | `/usuario/:id` | Retorna um usuário específico pelo ID. |
| `POST`   | `/usuario`     | Cria um novo usuário.                  |
| `PUT`    | `/usuario/:id` | Atualiza um usuário existente pelo ID. |
| `DELETE` | `/usuario/:id` | Exclui um usuário pelo ID.             |

## Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- PostgreSQL (servidor de banco de dados)

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd socialifpi-blog-backend
```

### 2. Instalar Dependências

```bash
npm install
```

Isso instalará todas as dependências do projeto, incluindo Express, postgres.js, dotenv, cors, swagger-ui-express, swagger-jsdoc e TypeScript.

### 3. Configurar o Banco de Dados

Crie um arquivo `.env` na raiz do projeto com a string de conexão do seu banco de dados PostgreSQL.

Exemplo de `.env`:

```dotenv
DATABASE_URL="postgresql://user:password@host:port/database_name"
```

**Importante:** Para desenvolvimento local, se o seu PostgreSQL não usa SSL, certifique-se de que a configuração no arquivo `db.ts` esteja com `ssl: false`.

```typescript
// db.ts
import postgres, { type Sql } from "postgres";

const connectionString = process.env.DATABASE_URL;

const sql: Sql = postgres(connectionString || "", {
  ssl: false, // <--- Certifique-se de que está 'false' para desenvolvimento local sem SSL
});

export default sql;
```

### 4. Inicializar e Popular o Banco de Dados

Execute o script de seed para criar as tabelas e popular o banco de dados com dados de exemplo.

```bash
npm run seed
```

**Observação:** Se você encontrar erros de conexão (`ETIMEDOUT`), verifique se o seu servidor PostgreSQL está rodando e acessível na `DATABASE_URL` configurada.

### 5. Iniciar o Servidor

Para iniciar o servidor Express em modo de desenvolvimento (com `ts-node` para executar TypeScript diretamente):

```bash
npm run start
```

O servidor estará rodando em `http://localhost:3000`.

### 6. Acessar a Documentação Swagger

Com o servidor rodando, abra seu navegador e acesse:

```
http://localhost:3000/api-docs
```

Você poderá ver e testar todas as rotas da API através da interface interativa do Swagger UI.
