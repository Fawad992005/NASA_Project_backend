const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLAunch,
  httpAbortLaunch,
} = require("./launches.controller");

const lauchesRouter = express.Router();

lauchesRouter.get("/", httpGetAllLaunches);
lauchesRouter.post("/", httpAddNewLAunch);
lauchesRouter.delete("/:id", httpAbortLaunch);

module.exports = lauchesRouter;
