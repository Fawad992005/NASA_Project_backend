const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8000 || process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startserver() {
  await mongoose.connect(MONGO_URL, {});
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
startserver();
