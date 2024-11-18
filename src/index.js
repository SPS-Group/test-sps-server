const express = require("express");
const cors = require('cors');
const routes = require("./routes"); 
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "db.json");

const initialData = [
  {
    "name": "admin",
    "email": "admin@spsgroup.com.br",
    "type": "admin",
    "password": "1234"
  }
];

// Função para inicializar o banco de dados com os dados iniciais
const initializeDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('Arquivo db.json inicializado com dados padrão.');
  }
};

// Middleware para tratar JSON
app.use(bodyParser.json());

// Função para ler o arquivo JSON
const readDB = () => {
  if (fs.existsSync(DB_FILE) && fs.statSync(DB_FILE).size > 0) {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  }
  // Se o arquivo estiver vazio ou não existir, inicializa o banco de dados com os dados padrões
  initializeDB();
  return initialData;
};

// Função para escrever no arquivo JSON
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    console.log('Dados salvos no db.json');
  } catch (error) {
    console.error('Erro ao escrever no banco de dados:', error);
  }
};

// Endpoint para obter todos os usuários
app.get("/users", (req, res) => {
  const users = readDB();
  res.json(users);
});

// Endpoint para adicionar um novo usuário
app.post("/users", (req, res) => {
  const { name, email, type, password } = req.body;

  // Verifica se os campos obrigatórios foram enviados
  if (!name || !email || !type || !password) {
    return res.status(400).json({ error: "Name, email, type, and password are required" });
  }

  const users = readDB();

  // Verifica se o email já existe
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Cria um novo usuário
  const newUser = { id: Date.now(), name, email, type, password };
  users.push(newUser);

  writeDB(users);

  res.status(201).json(newUser);
});

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

// Iniciar o servidor
app.use("/", routes);  // Usando as rotas no caminho raiz

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
