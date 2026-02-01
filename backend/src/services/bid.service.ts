import mongoose from "mongoose";
import { Item } from "../models/Item.model";
import { isAuctionEnded } from "../utils/time.util";

export const placeBid = async (
  itemId: string,
  amount: number,
  user: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const item = await Item.findById(itemId).session(session);
    if (!item) throw new Error("Item not found");
    if (isAuctionEnded(item.endsAt)) throw new Error("Auction ended");
    if (amount <= item.currentBid) throw new Error("Outbid");

    item.currentBid = amount;
    item.highestBidder = user;
    await item.save();

    await session.commitTransaction();
    return item;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
