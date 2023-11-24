require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = require("./config/config");
const connection = require("./connection/connection").connect;
const app = express();
const server = require("http").createServer(app);
const response = require("./response/index");

const api = require("./routes/routes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  response.ok,
  response.fail,
  response.serverError,
  response.forbidden,
  response.notFound,
  response.badRequest,
  response.unauthorized
);
app.use(cors());
app.use("/api", api);

//error handling middleware
const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  console.log(error);

  res.status(status).json({
    success: false,
    message: error.message,
  });
};
app.use(errorHandler);

connection((result) => {
  if (result) {
    server.listen(port.port, () => {
      console.log(`Server is running on port ${port.port}.`);
      port.print;
    });
  }
});
