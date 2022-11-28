const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
      console.log("Synced db.");
})
  .catch((err) => {
      console.log("Failed to sync db: " + err.message);
});

// Set to resolve the Cross Origin Request
var corsOptions = {
  // The Source of the request
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Moonkat local application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/contractRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});