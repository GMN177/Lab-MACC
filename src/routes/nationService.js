import { Router } from "express";
import nationController from "../controllers/nationController.js";
import log from "../utils/logger.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.send(await nationController.search({}));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

router.post("/search", async (req, res) => {
  try {
    return res.send(await nationController.search(req.body));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.send(await nationController.getNation(req.params.id));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

export default router;
