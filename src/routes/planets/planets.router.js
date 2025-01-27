const express = require("express");
const { httpGetAllPlanets } = require("./palnets.controller");

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
