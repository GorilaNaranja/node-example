const geolocationService = require("./geolocation.service");

const getDistance = (req, res, next) => {
  try {
    const body = req.body;
    const data = geolocationService.calculateDistance(
      body.start,
      body.end,
      body.unit
    );
    res.json({ ok: true, data });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getCenter = (req, res, next) => {
  try {
    const body = req.body;
    const center = geolocationService.calculateCenter(body.points);
    res.json({ ok: true, center });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getCenterBound = (req, res, next) => {
  try {
    const body = req.body;
    const centerBound = geolocationService.calculateCenterBound(body.points);
    res.json({ ok: true, centerBound });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getBounds = (req, res, next) => {
  try {
    const body = req.body;
    const bounds = geolocationService.calculateBounds(body.points);
    res.json({ ok: true, bounds });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getArea = (req, res, next) => {
  try {
    const body = req.body;
    const polygon = geolocationService.calculateArea(body.polygon);
    res.json({ ok: true, polygon });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getSpeed = (req, res, next) => {
  try {
    const body = req.body;
    const speedData = geolocationService.calculateSpeed(
      body.initialPoint,
      body.finalPoint,
      body.unit
    );
    res.json({ ok: true, data: speedData });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  getDistance,
  getCenter,
  getCenterBound,
  getBounds,
  getArea,
  getSpeed
};
