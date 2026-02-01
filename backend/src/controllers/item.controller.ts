import { Request, Response } from "express";
import { Item } from "../models/Item.model";
import { logger } from "../config/logger";

export const getItems = async (_: Request, res: Response) => {
  const items = await Item.find();
  logger.info("Items fetched", { count: items.length });
  res.json(items);
};
