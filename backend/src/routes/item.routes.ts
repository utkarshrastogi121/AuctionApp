import { Router } from "express";
import { getItems } from "../controllers/item.controller";
import { requestLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();
router.get("/items",requestLimiter, getItems);
export default router;
