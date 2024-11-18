const fs = require("fs");
const path = require("path");

// Caminho do arquivo db.json
const DB_FILE = path.join(__dirname, "../../../db.json");

// Função para ler os dados do banco de dados (db.json)
const readDB = () => {
    console.log("🚀 ~ DB_FILE:", DB_FILE);
    if (fs.existsSync(DB_FILE) && fs.statSync(DB_FILE).size > 0) {
      const data = fs.readFileSync(DB_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
};

// Função que retorna os dados de um usuário pelo nome (não valida senha)
const getUserByName = (name) => {
  const users = readDB();
  const find = users.find((user) => user.name === name);
  
  return find
};

module.exports = { getUserByName };
