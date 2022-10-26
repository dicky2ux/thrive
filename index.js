require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const app = express();
const morgan = require("morgan")("dev");
const cors = require("cors");

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan);

module.exports = app;
