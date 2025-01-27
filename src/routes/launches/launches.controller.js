const {
  getAllLaunches,
  scheduleLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.models");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLAunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  await scheduleLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchID = Number(req.params.id);
  const existinglaunch = await existLaunchWithId(launchID);
  if (!existinglaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortLaunchById(launchID);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLAunch,
  httpAbortLaunch,
};
