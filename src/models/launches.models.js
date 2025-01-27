const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploratiom X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  upcoming: true,
  success: true,
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
};

async function existLaunchWithId(launchId) {
  return launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found");
  }
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleLaunch(launch) {
  const nextFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "Zero To Mastery"],
    flightNumber: nextFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    { $set: { upcoming: false, success: false } }
  );

  return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  existLaunchWithId,
  abortLaunchById,
  scheduleLaunch,
};
