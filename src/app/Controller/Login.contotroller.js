const { LoginService } = require("../Service/Login.service");

const loginController = async (req, res) => {
    try {
        const peopleData = req.body;        
        const newPeople = await LoginService(peopleData);
        
        const token = jwt.sign(newPeople, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    
        return res.status(201).json({
          message: 'Login realizado com sucesso!',
          data: newPeople,
          token: token
        });
        } catch (error) {
          return res.status(500).json({ message: 'Erro no servidor', error });
        }

  };
  
  // Exportando diretamente a função
  module.exports = { loginController };
  