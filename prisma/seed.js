import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Inserir usuários
  await prisma.$executeRaw`
    INSERT INTO "Usuario" (username, password, "isAdmin") VALUES
    ('admin', '1234', true),
    ('user', '1234', false)
  `;

  // Inserir livros
  await prisma.$executeRaw`
    INSERT INTO "Livro" (title, author, available) VALUES
    ('1984', 'George Orwell', true),
    ('Dom Casmurro', 'Machado de Assis', true),
    ('Harry Potter', 'J.K. Rowling', false),
    ('Clean Code', 'Robert Martin', true)
  `;

  console.log("Dados inseridos com sucesso!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
