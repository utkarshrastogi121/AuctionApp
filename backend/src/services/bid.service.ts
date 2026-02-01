import { Item } from "../models/Item.model";
import { logger } from "../config/logger";

export const placeBid = async (
  itemId: string,
  amount: number,
  user: string
) => {
  const now = new Date();

  const updatedItem = await Item.findOneAndUpdate(
    {
      _id: itemId,
      endsAt: { $gt: now },
      currentBid: { $lt: amount }, // 🔒 atomic check
    },
    {
      $set: {
        currentBid: amount,
        highestBidder: user,
      },
    },
    { new: true }
  );

  if (!updatedItem) {
    logger.warn("Bid rejected", { itemId, amount, user });
    throw new Error("Outbid or auction ended");
  }

  logger.info("Bid accepted", {
    itemId,
    amount,
    user,
  });

  return updatedItem;
};
