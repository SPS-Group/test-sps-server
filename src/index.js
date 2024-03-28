const routes = require("./routes");
const express = require('express');
const authMiddleware = require("./app/middlewares/auth");
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
  if (req.originalUrl === '/login') {
      next();
  } else {
      authMiddleware(req, res, next);
  }
});
