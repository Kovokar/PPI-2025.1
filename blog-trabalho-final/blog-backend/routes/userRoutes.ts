import express, { type Request, type Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { Usuario } from "../models/Usuario";
import sql from "../db";

const router = express.Router();
const userRepository = new UserRepository(sql);

const BASE_PATH = "/usuario";
const ID_PATH = `${BASE_PATH}/:id`;

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro interno do servidor
 */
router.get(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const usuarios = await userRepository.listar();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = await userRepository.consultar(id);

    if (!usuario) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    res.json(usuario);
  } catch (error) {
    console.error("Erro ao consultar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Usuário"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "novo.usuario@example.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "minhasenha123"
 *             required:
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Nome, email e senha são obrigatórios
 *       409:
 *         description: Email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(BASE_PATH, async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }
    const existingUser = await userRepository.consultarPorEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }

    const novoUsuario = new Usuario(0, nome, email, senha);
    const usuarioIncluido = await userRepository.incluir(novoUsuario);
    res.status(201).json({
      id: usuarioIncluido.getId(),
      nome: usuarioIncluido.getNome(),
      email: usuarioIncluido.getEmail(),
    });
  } catch (error) {
    console.error("Erro ao incluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    const sucesso = await userRepository.alterar(id, nome, email, senha);
    if (!sucesso) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuário alterado com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.delete(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const sucesso = await userRepository.excluir(id);
    if (!sucesso) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
