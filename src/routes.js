const { Router } = require("express");
const usuarioController = require("./app/controllers/User");
const sessionController = require("./app/controllers/Session");
const routes = Router();

// Rota para criar um usuário
routes.post('/users', (req, res) => {
  const {  name, email, password } = req.body;
  usuarioController.criarUsuario(name, email, password);
  res.send('Usuário criado com sucesso');
});

// Rota para listar todos os usuários
routes.get('/users', (req, res) => {
  const usuarios = usuarioController.listarUsuarios();
  res.json(usuarios);
});

// Rota para buscar um usuário por ID
routes.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarioController.buscarUsuarioPorId(id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Rota para atualizar um usuário
routes.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const sucesso = usuarioController.atualizarUsuario(id, name, email);
  if (sucesso) {
    res.send('Usuário atualizado com sucesso');
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Rota para deletar um usuário
routes.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sucesso = usuarioController.deletarUsuario(id);
  if (sucesso) {
    res.send('Usuário deletado com sucesso');
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Rota de login para autenticar o usuário e gerar um token JWT
routes.post('/login', async (req, res) => await sessionController.login(req, res));

module.exports = routes;