const express = require("express");
const logger = require("../utils/logger");
const nationController = require("../controllers/nationController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.send(await nationController.search({}));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

router.post("/search", async (req, res) => {
  try {
    return res.send(await nationController.search(req.body));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.send(await nationController.getNation(req.params.id));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;
