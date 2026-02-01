import { Schema, model, Document } from "mongoose";

export interface IItem extends Document {
  title: string;
  startingPrice: number;
  currentBid: number;
  highestBidder: string | null;
  endsAt: Date;
}

const ItemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  startingPrice: Number,
  currentBid: Number,
  highestBidder: String,
  endsAt: Date,
});

export const Item = model<IItem>("Item", ItemSchema);
