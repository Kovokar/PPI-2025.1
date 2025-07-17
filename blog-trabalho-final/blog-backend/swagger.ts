import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SocialIFPI Blog API",
      version: "1.0.0",
      description:
        "Documentação da API do Blog SocialIFPI, construída com Express e PostgreSQL.",
    },
    servers: [
      {
        url: "http://localhost:3000/socialifpi", 
        description: "Servidor de Desenvolvimento Local",
      },
    ],
    components: {
      schemas: {
        Postagem: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int32",
              description: "ID da postagem",
            },
            titulo: { type: "string", description: "Título da postagem" },
            conteudo: { type: "string", description: "Conteúdo da postagem" },
            data: {
              type: "string",
              format: "date-time",
              description: "Data da postagem",
            },
            curtidas: {
              type: "integer",
              format: "int32",
              description: "Número de curtidas",
            },
            categorias: {
              type: "array",
              items: { type: "string" },
              description: "Categorias da postagem",
            },
            shares: {
              type: "integer",
              format: "int32",
              description: "Número de compartilhamentos",
            },
          },
          required: ["titulo", "conteudo"],
        },
        Comentario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int32",
              description: "ID do comentário",
            },
            postId: {
              type: "integer",
              format: "int32",
              description: "ID da postagem associada",
            },
            autor: {
              type: "string",
              description: "Nome do autor do comentário",
            },
            conteudo: { type: "string", description: "Conteúdo do comentário" },
            data: {
              type: "string",
              format: "date-time",
              description: "Data do comentário",
            },
            likes: {
              type: "integer",
              format: "int32",
              description: "Número de curtidas do comentário",
            },
          },
          required: ["postId", "autor", "conteudo"],
        },
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int32",
              description: "ID do usuário",
            },
            nome: { type: "string", description: "Nome do usuário" },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário (único)",
            },
            senha: {
              type: "string",
              format: "password",
              description: "Senha do usuário (hashed em produção)",
            },
          },
          required: ["nome", "email", "senha"],
        },
      },
    },
  },
  apis: ["./routes/*.ts"], 
};

const specs = swaggerJsdoc(options);

export default specs;
