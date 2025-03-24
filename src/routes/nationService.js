import { Router } from "express";
import nationController from "../controllers/nationController.js";
import nationValidation from "../validations/nation.validation.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.get("/", async (req, res, next) =>
  res.send(await nationController.search({})),
);

router.get(
  "/search",
  validate(nationValidation.searchNation),
  async (req, res, next) => res.send(await nationController.search(req.query)),
);

router.get(
  "/:nationId",
  validate(nationValidation.getNation),
  async (req, res, next) =>
    res.send(await nationController.getNation(req.params.nationId)),
);

export default router;
