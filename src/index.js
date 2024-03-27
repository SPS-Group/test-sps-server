const routes = require("./routes");
const express = require('express')
const authMiddleware = require("./App/middlewares/auth");
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(authMiddleware)

app.use(routes);
