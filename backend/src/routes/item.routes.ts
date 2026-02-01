import { Router } from "express";
import { addItem, getItems } from "../controllers/item.controller";
import { requestLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

router.post("/items", addItem);
router.get("/items",requestLimiter, getItems);

export default router;
