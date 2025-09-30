import express from "express";
import { verificarAdministrador } from "../middlewares/admin.js";

import {
  listarLivros,
  obterLivro,
  criarLivro,
  atualizarLivro,
  deletarLivro,
  emprestarLivro,
  devolverLivro,
} from "../controller/livros.js";

const router = express.Router();

// Rotas públicas
router.get("/", listarLivros);
router.get("/:id", obterLivro);

// Rotas que só admins podem usar
router.post("/", verificarAdministrador, criarLivro);
router.patch("/:id", verificarAdministrador, atualizarLivro);
router.delete("/:id", verificarAdministrador, deletarLivro);

// Rotas de empréstimo/devolução (não precisam do admin)
router.post("/:id/emprestar", emprestarLivro);
router.post("/:id/devolver", devolverLivro);

export default router;
