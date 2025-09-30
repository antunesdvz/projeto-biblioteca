import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function registrarUsuario(req, res) {
  const { username, password } = req.body;

  if (!username || !password || password.length < 4) {
    return res.status(400).json({ mensagem: "Dados inválidos" });
  }

  try {
    // Conta quantos usuários existem
    const qtdUsuarios = await prisma.Usuario.count();
    const isAdmin = qtdUsuarios === 0;

    // Cria o usuário
    const novoUsuario = await prisma.Usuario.create({
      data: { username, password, isAdmin },
    });

    res.json({ mensagem: "Usuário registrado com sucesso", UsuarioId: novoUsuario.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ mensagem: "Erro ao criar usuário ou usuário já existe" });
  }
}
