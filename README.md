# Projeto Biblioteca

## Autor
**Gabriel Antunes**

## Descrição
Este projeto é uma API de biblioteca desenvolvida com **Node.js**, **Express** e **Prisma**, que permite gerenciar livros e usuários. O sistema inclui autenticação simples para o usuário Gabriel e controle de permissões.  

---

## Tecnologias
- Node.js
- Express
- Prisma ORM
- SQLite
- Postman (para testes)

---

## Estrutura de Rotas

### **Livros**

| Método | Rota                     | Descrição                               | Acesso                     |
|--------|--------------------------|-----------------------------------------|----------------------------|
| GET    | `/livros`                | Lista todos os livros                   | Público                    |
| GET    | `/livros/:id`            | Obter livro por ID                      | Público                    |
| POST   | `/livros`                | Criar livro                             | Gabriel (username: Gabriel, password: 8002) |
| PATCH  | `/livros/:id`            | Atualizar livro                          | Gabriel (username: Gabriel, password: 8002) |
| DELETE | `/livros/:id`            | Deletar livro                            | Gabriel (username: Gabriel, password: 8002) |
| POST   | `/livros/:id/emprestar`  | Emprestar livro                          | Público                    |
| POST   | `/livros/:id/devolver`   | Devolver livro                           | Público                    |

---

## **Middleware Gabriel**
- Foi criado um middleware chamado `verificarAdministrador`.  
- Ele permite que apenas o usuário **Gabriel** (senha: `8002`) consiga criar, atualizar ou deletar livros, sem precisar de um administrador.  
- Para acessar as rotas protegidas, o body da requisição deve conter:

```json
{
  "username": "Gabriel",
  "password": "8002"
}
