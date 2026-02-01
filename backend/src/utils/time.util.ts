export const isAuctionEnded = (endsAt: Date) => {
  return new Date() > endsAt;
};
