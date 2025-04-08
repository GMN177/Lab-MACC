import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/:userId/searches", async (req, res, next) => {
  if (req.user.user_id !== req.params.userId) res.sendStatus(500);
  res.send(await userController.getUserSearches(req.params.userId));
});

router.post("/:userId/searches", async (req, res, next) => {
  if (req.user.user_id !== req.params.userId) res.sendStatus(500);
  res.send(await userController.saveUserSearch(req.params.userId, req.body));
});

export default router;
