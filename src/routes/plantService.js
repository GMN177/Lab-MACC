import { Router } from "express";
import nationController from "../controllers/nationController.js";
import plantController from "../controllers/plantController.js";
import plantValidation from "../validations/plant.validation.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.get("/", async (req, res, next) =>
  res.send(await plantController.search({})),
);

router.get(
  "/search",
  validate(plantValidation.searchPlant),
  async (req, res, next) => {
    let nations;
    if (req.query.lng && req.query.lat) {
      nations = await nationController
        .search({
          lng: req.query.lng,
          lat: req.query.lat,
        })
        .then((nations) => nations.map((nation) => nation.name));
    }
    res.send(await plantController.search(req.query, nations));
  },
);

router.get(
  "/:plantId",
  validate(plantValidation.getPlant),
  async (req, res, next) =>
    res.send(await plantController.getPlant(req.params.plantId)),
);

export default router;
