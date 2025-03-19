const express = require("express");
const logger = require("../utils/logger");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId/searches", async (req, res) => {
  try {
    return res.send(await userController.getUserSearches(req.params.userId));
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

router.post("/:userId/searches", async (req, res) => {
  try {
    return res.send(
      await userController.saveUserSearch(req.params.userId, req.body),
    );
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;
