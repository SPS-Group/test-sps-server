const routes = require("./routes");
const express = require('express')
const authMiddleware = require("./App/middlewares/auth");
require('dotenv').config();
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

app.use(express.json());

app.use(authMiddleware)

app.use(routes);
