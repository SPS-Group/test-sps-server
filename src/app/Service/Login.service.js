const { getUserByName } = require("../Model/Login.model"); // Importa a função do Model

const LoginService = (loginData) => {
  const { usuario, senha } = loginData;

  // Busca o usuário no banco de dados
  const user = getUserByName(usuario);

  // Se o usuário não existir
  if (!user) {
    return { success: false, message: "Usuário não encontrado." };
  }

  // Verifica se a senha está correta
  if (user.password !== senha) {
    return { success: false, message: "Senha incorreta." };
  }

  // Se o usuário e senha estiverem corretos
  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    },
  };
};

module.exports = { LoginService };
