const express = require("express");
const router = express.Router();

const peopleController = require("./people.controller");

router.get("/", peopleController.listPeople);
router.get("/:id", peopleController.getPeople);
router.get("/schema", peopleController.schema);

module.exports = router;
