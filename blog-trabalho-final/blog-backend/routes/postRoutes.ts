import express, { type Request, type Response } from "express";
import { PostRepository } from "../repositories/PostRepository";
import { CommentRepository } from "../repositories/CommentRepository";
import { Postagem } from "../models/Postagem";
import { Comentario } from "../models/Comentario";
import sql from "../db";

const router = express.Router();
const postRepository = new PostRepository(sql);
const commentRepository = new CommentRepository(sql);

const BASE_PATH = "/postagem";
const ID_PATH = `${BASE_PATH}/:id`;
const CURTIR_PATH = `${ID_PATH}/curtir`;
const COMPARTILHAR_PATH = `${ID_PATH}/compartilhar`;
const COMENTARIOS_PATH = `${ID_PATH}/comentarios`;

/**
 * @swagger
 * /postagem:
 *   get:
 *     summary: Lista todas as postagens
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Termo de busca para título ou conteúdo da postagem
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoria para filtrar as postagens
 *     responses:
 *       200:
 *         description: Lista de postagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 *       500:
 *         description: Erro interno do servidor
 */
router.get(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;
    const postagens = await postRepository.listar(
      search as string,
      category as string
    );
    res.json(postagens);
  } catch (error) {
    console.error("Erro ao listar postagens:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

/**
 * @swagger
 * /postagem/{id}:
 *   get:
 *     summary: Retorna uma postagem pelo ID
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Detalhes da postagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postagem'
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const postagem = await postRepository.consultar(id);

    if (!postagem) {
      res.status(404).json({ message: "Postagem não encontrada" });
      return;
    }
    res.json(postagem);
  } catch (error) {
    console.error("Erro ao consultar postagem:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

/**
 * @swagger
 * /postagem:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Postagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Meu Novo Artigo"
 *               conteudo:
 *                 type: string
 *                 example: "Este é o conteúdo do meu novo artigo."
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-27T10:00:00Z"
 *               curtidas:
 *                 type: integer
 *                 example: 0
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tecnologia", "Programação"]
 *               shares:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postagem'
 *       500:
 *         description: Erro interno do servidor
 */
router.post(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const { titulo, conteudo, data, curtidas, categorias, shares } = req.body;
    const novaPostagem = new Postagem(
      0,
      titulo,
      conteudo,
      new Date(data),
      curtidas || 0,
      categorias || [],
      shares || 0
    );
    const postagemIncluida = await postRepository.incluir(novaPostagem);
    res.status(201).json(postagemIncluida);
  } catch (error) {
    console.error("Erro ao incluir postagem:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const { titulo, conteudo, data, curtidas, categorias, shares } = req.body;

    const sucesso = await postRepository.alterar(
      id,
      titulo,
      conteudo,
      new Date(data),
      curtidas,
      categorias || [],
      shares
    );
    if (!sucesso) {
      res.status(404).json({ message: "Postagem não encontrada" });
      return;
    }
    res.status(200).json({ message: "Postagem alterada com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar postagem:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.delete(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const sucesso = await postRepository.excluir(id);
    if (!sucesso) {
      res.status(404).json({ message: "Postagem não encontrada" });
      return;
    }
    res.status(200).json({ message: "Postagem excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir postagem:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

/**
 * @swagger
 * /postagem/{id}/curtir:
 *   post:
 *     summary: Curte uma postagem
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem a ser curtida
 *     responses:
 *       200:
 *         description: Postagem curtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Postagem curtida com sucesso"
 *                 curtidas:
 *                   type: integer
 *                   example: 11
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post(CURTIR_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const curtidas = await postRepository.curtir(id);

    if (curtidas == null) {
      res.status(404).json({ message: "Postagem não encontrada" });
      return;
    }
    res.json({ message: "Postagem curtida com sucesso", curtidas });
  } catch (error) {
    console.error("Erro ao curtir postagem:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post(COMPARTILHAR_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const shares = await postRepository.incrementShares(id);

    if (shares == null) {
      res.status(404).json({ message: "Postagem não encontrada" });
      return;
    }
    res.json({ message: "Postagem compartilhada com sucesso", shares });
  } catch (error) {
    console.error("Erro ao compartilhar postagem:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

/**
 * @swagger
 * /postagem/{id}/comentarios:
 *   post:
 *     summary: Adiciona um comentário a uma postagem
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem para adicionar o comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               autor:
 *                 type: string
 *                 example: "Comentarista Anônimo"
 *               conteudo:
 *                 type: string
 *                 example: "Que postagem interessante!"
 *               likes:
 *                 type: integer
 *                 example: 0
 *             required:
 *               - autor
 *               - conteudo
 *     responses:
 *       201:
 *         description: Comentário adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Autor e conteúdo do comentário são obrigatórios
 *       500:
 *         description: Erro interno do servidor
 */
router.post(COMENTARIOS_PATH, async (req: Request, res: Response) => {
  try {
    const postId = Number.parseInt(req.params.id);
    const { autor, conteudo, likes } = req.body;
    if (!autor || !conteudo) {
      return res
        .status(400)
        .json({ message: "Autor e conteúdo do comentário são obrigatórios." });
    }
    const novoComentario = new Comentario(
      0,
      postId,
      autor,
      conteudo,
      new Date(),
      likes || 0
    );
    const comentarioIncluido = await commentRepository.addComment(
      novoComentario
    );
    res.status(201).json(comentarioIncluido);
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

/**
 * @swagger
 * /postagem/{id}/comentarios:
 *   get:
 *     summary: Lista todos os comentários de uma postagem
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem para listar os comentários
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Erro interno do servidor
 */
router.get(COMENTARIOS_PATH, async (req: Request, res: Response) => {
  try {
    const postId = Number.parseInt(req.params.id);
    const comentarios = await commentRepository.listCommentsByPostId(postId);
    res.json(comentarios);
  } catch (error) {
    console.error("Erro ao listar comentários:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
