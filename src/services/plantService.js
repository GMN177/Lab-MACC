const express = require("express");
const logger = require("../utils/logger");
const plantController = require("../controllers/plantController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.send(await plantController.search({}));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

router.post("/search", async (req, res) => {
  try {
    return res.send(await plantController.search(req.body));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.send(await plantController.getPlant(req.params.id));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;
