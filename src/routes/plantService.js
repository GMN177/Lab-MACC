import { Router } from "express";
import nationController from "../controllers/nationController.js";
import plantController from "../controllers/plantController.js";

const router = Router();

router.get("/", async (req, res, next) =>
  res.send(await plantController.search({})),
);

router.post("/search", async (req, res, next) => {
  if (req.body.lng && req.body.lat) {
    req.body.nations = (
      await nationController.search({
        lng: req.body.lng,
        lat: req.body.lat,
      })
    ).map((nation) => nation.name);
  }
  res.send(await plantController.search(req.body));
});

router.get("/:id", async (req, res, next) =>
  res.send(await plantController.getPlant(req.params.id)),
);

export default router;
