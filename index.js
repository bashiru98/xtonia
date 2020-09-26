const winston = require("winston");
const data = require("./data");
const path = require("path");
const express = require("express");
const config = require("config");
const app = express();

app.get("/api/config/paypal", (req, res) => {
  res.send(config.get("PAYPAL_CLIENT_ID"));
});
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
