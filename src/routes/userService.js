import { Router } from "express";
import userController from "../controllers/userController.js";
import log from "../utils/logger.js";

const router = Router();

router.get("/:userId/searches", async (req, res) => {
  try {
    return res.send(await userController.getUserSearches(req.params.userId));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

router.post("/:userId/searches", async (req, res) => {
  try {
    return res.send(
      await userController.saveUserSearch(req.params.userId, req.body),
    );
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

export default router;
