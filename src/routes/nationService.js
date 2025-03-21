import { Router } from "express";
import nationController from "../controllers/nationController.js";
import log from "../utils/logger.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.send(await nationController.search({}));
  } catch (err) {
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    res.send(await nationController.search(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await nationController.getNation(req.params.id));
  } catch (err) {
    next(err);
  }
});

export default router;
