// usuarioController.js

class Usuario {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}

class UsuarioController {
  constructor() {
      this.usuarios = [];
  }

  // Create
  criarUsuario(id, nome, email) {
      const usuario = new Usuario(id, nome, email);
      this.usuarios.push(usuario);
  }

  // Read
  listarUsuarios() {
      return this.usuarios;
  }

  buscarUsuarioPorId(id) {
      return this.usuarios.find(usuario => usuario.id === id);
  }

  // Update
  atualizarUsuario(id, nome, email) {
      const usuario = this.buscarUsuarioPorId(id);
      if (usuario) {
          if (nome !== undefined) {
              usuario.nome = nome;
          }
          if (email !== undefined) {
              usuario.email = email;
          }
          return true;
      }
      return false;
  }

    // Delete
    deletarUsuario(id) {
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index !== -1) {
            this.usuarios.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = UsuarioController;
