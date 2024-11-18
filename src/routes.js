const { Router } = require("express");
const { loginController } = require("./app/Controller/Login.contotroller");
const authenticateJWT = require("./app/Middleware/authMiddleware");

const routes = Router();

// Rota GET para a raiz
routes.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rota POST para login (sem validação de JWT)
routes.post("/login", loginController);

// Rota POST para delete (com validação de JWT)
// routes.post("/delete", authenticateJWT, (req, res) => {
//  res.send("Delete endpoint - Acesso autorizado.");
// });

module.exports = routes;
