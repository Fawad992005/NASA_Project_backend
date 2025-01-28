const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.router");
const launhcesRouter = require("./routes/launches/launches.router");

const app = express();
app.use(
  cors({
    origin: "https://nasa-project-frontend-ii1jh4yw9-fawad992005s-projects.vercel.app",
  })
);
app.use(morgan("combined"));
app.use(express.json());

app.use("/planets", planetsRouter);
app.use("/launches", launhcesRouter);

module.exports = app;
