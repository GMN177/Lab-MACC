import { Router } from "express";
import plantController from "../controllers/plantController.js";
import log from "../utils/logger.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.send(await plantController.search({}));
  } catch (err) {
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    res.send(await plantController.search(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await plantController.getPlant(req.params.id));
  } catch (err) {
    next(err);
  }
});

export default router;
