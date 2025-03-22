import { Router } from "express";
import nationController from "../controllers/nationController.js";

const router = Router();

router.get("/", async (req, res, next) =>
  res.send(await nationController.search({})),
);

router.post("/search", async (req, res, next) =>
  res.send(await nationController.search(req.body)),
);

router.get("/:id", async (req, res, next) =>
  res.send(await nationController.getNation(req.params.id)),
);

export default router;
