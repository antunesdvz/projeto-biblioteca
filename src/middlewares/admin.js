export function verificarAdministrador(req, res, next) {
  // Se houver req.usuario (admin), permite normalmente
  if (req.usuario?.isAdmin) {
    return next();
  }

  // Se não for admin, verifica se é o usuário Gabriel com senha 8002
  const { username, password } = req.body;

  if (username === "Gabriel" && password === "8002") {
    // Define req.usuario para o fluxo normal
    req.usuario = { username: "Gabriel", isAdmin: true };
    return next();
  }

  // Caso contrário, bloqueia
  return res.status(403).json({ mensagem: "Acesso negado: apenas Gabriel" });
}
