class Usuario {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class UsuarioController {
  constructor() {
      this.usuarios = [{ id: 2, name: "admin", email: "admin@spsgroup.com.br", type: "admin", password: "1234" }];
  }

  // Create
  criarUsuario(name, email, password) {
      const usuario = new Usuario(this.usuarios.length + 1, name, email, password);
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
  atualizarUsuario(id, name, email, password) {
      const usuario = this.buscarUsuarioPorId(id);
      if (usuario) {
          if (name !== undefined) {
              usuario.name = name;
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

    buscarUsuarioPorEmail(email) {
        return this.usuarios.find(usuario => usuario.email === email);
    }
}

module.exports = new UsuarioController();
