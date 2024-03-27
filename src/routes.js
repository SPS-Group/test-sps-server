const { Router } = require("express");
const UsuarioController = require("./App/Controllers/user");
const routes = Router();
const usuarioController = new UsuarioController();

// Rota para criar um usuário
routes.post('/usuarios', (req, res) => {
  const { id, nome, email } = req.body;
  usuarioController.criarUsuario(id, nome, email);
  res.send('Usuário criado com sucesso');
});

// Rota para listar todos os usuários
routes.get('/usuarios', (req, res) => {
  const usuarios = usuarioController.listarUsuarios();
  res.json(usuarios);
});

// Rota para buscar um usuário por ID
routes.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarioController.buscarUsuarioPorId(id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Rota para atualizar um usuário
routes.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;
  const sucesso = usuarioController.atualizarUsuario(id, nome, email);
  if (sucesso) {
    res.send('Usuário atualizado com sucesso');
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Rota para deletar um usuário
routes.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sucesso = usuarioController.deletarUsuario(id);
  if (sucesso) {
    res.send('Usuário deletado com sucesso');
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});
module.exports = routes;