import { Request, Response } from "express";
import { Item } from "../models/Item.model";
import { logger } from "../config/logger";

export const getItems = async (_: Request, res: Response) => {
  const items = await Item.find();
  logger.info("Items fetched", { count: items.length });
  res.json(items);
};


export const addItem = async (req: Request, res: Response) => {
  try {
    const { title, startingPrice, endsAt } = req.body;

    const item = await Item.create({
      title,
      startingPrice,
      currentBid: startingPrice,
      highestBidder: null,
      endsAt,
    });

    logger.info("Item created", { itemId: item._id });

    res.status(201).json(item);
  } catch (err) {
    logger.error("Add item failed", err);
    res.status(400).json({ message: "Invalid payload" });
  }
};