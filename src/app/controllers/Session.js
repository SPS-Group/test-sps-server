const jwt = require('jsonwebtoken');
const User = require('./User');

class SessionController {
  async login (req, res) {
    const { email, password } = req.body

    const user = await User.buscarUsuarioPorEmail(email)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (user.password !== password){
      return res.status(401).json({ error: 'Password does not match' })
    }

    const { id, name } = user

    return res.json({
      user: {
        id,
        name
      },
      token: jwt.sign({ id }, process.env.KEY, {
        expiresIn: '7d'
      })
    })
  }
}

module.exports = new SessionController();