import express from "express";
import { registrarUsuario } from "../controller/usuario.js";

const router = express.Router();

// Rota de registro do usuário
router.post("/registrar", registrarUsuario);

export default router;
