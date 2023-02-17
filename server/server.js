const express = require("express");
const cors = require("cors");

const app = express();

// Set to resolve the Cross Origin Request
let corsOptions = {
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
const contract = require("./app/routes/contractRoutes");
app.use("/api/contract", contract)
const user = require("./app/routes/userRoutes");
app.use("/api/user", user)
const report = require("./app/routes/reportRoutes");
app.use("/api/report", report)
const simulate = require("./app/routes/transactionSimulationRoutes");
app.use("/api/simulate", simulate)
const record = require("./app/routes/recordRoutes")
app.use("/api/record", record)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
