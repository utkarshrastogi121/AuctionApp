import { Request, Response } from "express";
import { Item } from "../models/Item.model";

export const getItems = async (_: Request, res: Response) => {
  const items = await Item.find();
  res.json(items);
};
