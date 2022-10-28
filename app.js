require("dotenv").config();
const express = require("express");
const router = require("./routes/index.routes");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan")("dev");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan);

app.use(router);

module.exports = app;
