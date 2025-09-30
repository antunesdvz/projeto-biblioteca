import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function listarLivros(req, res) {
  const livros = await prisma.Livro.findMany();
  res.json(livros);
}

export async function obterLivro(req, res) {
  const livro = await prisma.Livro.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });
  res.json(livro);
}

export async function criarLivro(req, res) {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ mensagem: "Dados inválidos" });

  const livro = await prisma.Livro.create({ data: { title, author } });
  res.json({ mensagem: "Livro criado com sucesso", livro });
}

export async function atualizarLivro(req, res) {
  const livro = await prisma.Livro.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json({ mensagem: "Livro atualizado com sucesso", livro });
}

export async function deletarLivro(req, res) {
  await prisma.Livro.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ mensagem: "Livro deletado com sucesso" });
}

export async function emprestarLivro(req, res) {
  const livro = await prisma.Livro.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });
  if (!livro.available) return res.status(400).json({ mensagem: "Livro indisponível" });

  await prisma.Livro.update({ where: { id: livro.id }, data: { available: false } });
  res.json({ mensagem: "Livro emprestado com sucesso" });
}

export async function devolverLivro(req, res) {
  const livro = await prisma.Livro.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });

  await prisma.Livro.update({ where: { id: livro.id }, data: { available: true } });
  res.json({ mensagem: "Livro devolvido com sucesso" });
}
