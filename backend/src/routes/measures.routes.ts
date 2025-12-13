import { Router } from "express";
import { upsertMeasures, getMeasuresByUser, deleteMeasures, getMeasuresByPublicCode } from "../controllers/measures.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getMeasuresByUser);
router.post("/", authMiddleware, upsertMeasures);
router.put("/", authMiddleware, upsertMeasures);
router.delete("/", authMiddleware, deleteMeasures);

/* router.get("/public/:code", getMeasuresByPublicCode); */

export default router;
