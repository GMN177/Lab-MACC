import { Router } from "express";
import plantController from "../controllers/plantController.js";
import log from "../utils/logger.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.send(await plantController.search({}));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

router.post("/search", async (req, res) => {
  try {
    return res.send(await plantController.search(req.body));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.send(await plantController.getPlant(req.params.id));
  } catch (err) {
    log.error(err.message);
    return res.sendStatus(500);
  }
});

export default router;
