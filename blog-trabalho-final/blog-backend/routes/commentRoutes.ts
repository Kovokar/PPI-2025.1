import express, { type Request, type Response } from "express"
import { CommentRepository } from "../repositories/CommentRepository"
import sql from "../db"

const router = express.Router()
const commentRepository = new CommentRepository(sql)

// Definir os caminhos base para as rotas de comentário
const BASE_PATH = "/comentario"
const ID_PATH = `${BASE_PATH}/:id`
const CURTIR_PATH = `${ID_PATH}/curtir`

// Rotas para Comentários (operações em comentários individuais)
/**
 * @swagger
 * /comentario/{id}:
 *   put:
 *     summary: Atualiza um comentário existente
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               autor:
 *                 type: string
 *                 example: "Autor Atualizado"
 *               conteudo:
 *                 type: string
 *                 example: "Conteúdo do comentário atualizado."
 *             required:
 *               - autor
 *               - conteudo
 *     responses:
 *       200:
 *         description: Comentário alterado com sucesso
 *       400:
 *         description: Autor e conteúdo do comentário são obrigatórios
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id)
    const { autor, conteudo } = req.body
    if (!autor || !conteudo) {
      return res.status(400).json({ message: "Autor e conteúdo do comentário são obrigatórios." })
    }
    const sucesso = await commentRepository.updateComment(id, autor, conteudo)
    if (!sucesso) {
      res.status(404).json({ message: "Comentário não encontrado" })
      return
    }
    res.status(200).json({ message: "Comentário alterado com sucesso" })
  } catch (error) {
    console.error("Erro ao alterar comentário:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

router.delete(ID_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id)
    const sucesso = await commentRepository.deleteComment(id)
    if (!sucesso) {
      res.status(404).json({ message: "Comentário não encontrado" })
      return
    }
    res.status(200).json({ message: "Comentário excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir comentário:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

/**
 * @swagger
 * /comentario/{id}/curtir:
 *   post:
 *     summary: Curte um comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentário a ser curtido
 *     responses:
 *       200:
 *         description: Comentário curtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comentário curtido com sucesso"
 *                 curtidas:
 *                   type: integer
 *                   example: 6
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(CURTIR_PATH, async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id)
    const curtidas = await commentRepository.likeComment(id)

    if (curtidas == null) {
      res.status(404).json({ message: "Comentário não encontrado" })
      return
    }
    res.json({ message: "Comentário curtido com sucesso", curtidas })
  } catch (error) {
    console.error("Erro ao curtir comentário:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

export default router
