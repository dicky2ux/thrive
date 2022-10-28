require("dotenv").config();
const express = require("express");
const router = require("./routes/index.routes");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const morgan = require("morgan")("dev");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://staging-thrive.herokuapp.com/",
  "https://thrive-project.com/",
];
app.use(cors({ origin: whitelist }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan);

app.use(router);

module.exports = app;
