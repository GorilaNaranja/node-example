const geolib = require("geolib");

const calculateDistance = (start, end, unit = "kmh") => {
  const distanceData = geolib.getDistance(start, end, (accuracy = 1));
  const distance = geolib.convertDistance(distanceData, unit);
  return { distance, unit };
};

const calculateCenter = points => {
  return geolib.getCenter(points);
};

const calculateCenterBound = points => {
  return geolib.getCenterOfBounds(points);
};

const calculateBounds = points => {
  return geolib.getBounds(points);
};

const calculateArea = polygon => {
  return geolib.getAreaOfPolygon(polygon);
};

const calculateSpeed = (initialPoint, finalPoint, unit = "kmh") => {
  const speedData = geolib.getSpeed(initialPoint, finalPoint);
  const speed = geolib.convertSpeed(speedData, unit);
  return { speed, unit };
};

module.exports = {
  calculateDistance,
  calculateCenter,
  calculateCenterBound,
  calculateBounds,
  calculateArea,
  calculateSpeed
};
