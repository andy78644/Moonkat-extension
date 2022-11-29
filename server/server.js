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

var corsOptions = {
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
const contract = require("./app/routes/contractRoutes");
app.use("/contract", contract)
const user = require("./app/routes/UserRoutes");
app.use("/user", user)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});