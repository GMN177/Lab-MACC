import { Router } from "express";
import userController from "../controllers/userController.js";
import log from "../utils/logger.js";

const router = Router();

router.get("/:userId/searches", async (req, res, next) => {
  try {
    res.send(await userController.getUserSearches(req.params.userId));
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/searches", async (req, res, next) => {
  try {
    res.send(await userController.saveUserSearch(req.params.userId, req.body));
  } catch (err) {
    next(err);
  }
});

export default router;
