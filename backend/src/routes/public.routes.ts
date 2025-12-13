import { Router } from "express";
import { getMeasuresByPublicCode } from "../controllers/measures.controller";

const router = Router();

router.get("/:code", getMeasuresByPublicCode);

export default router;
