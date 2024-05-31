const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./src/configs/config.js");
const routes = require("./src/routes");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./src/models");
db.sequelize.authenticate().then(() => {});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
app.use("/api", routes);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
