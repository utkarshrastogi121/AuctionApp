export interface AuctionItem {
  _id: string;
  title: string;
  currentBid: number;
  highestBidder: string | null;
  endsAt: string;
}
