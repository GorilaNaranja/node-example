const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const geolocationController = require("./geolocation.controller");

const app = express();

app.get(
  "/geolocation/distance",
  tokenVerification,
  geolocationController.getDistance
);

app.get(
  "/geolocation/center",
  tokenVerification,
  geolocationController.getCenter
);
app.get(
  "/geolocation/centerbound",
  tokenVerification,
  geolocationController.getCenterBound
);
app.get(
  "/geolocation/bounds",
  tokenVerification,
  geolocationController.getBounds
);
app.get("/geolocation/area", tokenVerification, geolocationController.getArea);
app.get(
  "/geolocation/speed",
  tokenVerification,
  geolocationController.getSpeed
);

module.exports = app;
