import { useState } from "react";
import type { AuctionItem } from "../types/auction";
import { socket } from "../lib/socket";
import { useAuctionTimer } from "../hooks/useAuctionTimer";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function AuctionCard({ item }: { item: AuctionItem }) {
  const [price, setPrice] = useState(item.currentBid);
  const [status, setStatus] = useState<"WIN" | "OUT" | null>(null);
  const secondsLeft = useAuctionTimer(item.endsAt);

  socket.off("UPDATE_BID").on("UPDATE_BID", (updated: AuctionItem) => {
    if (updated._id === item._id) {
      setPrice(updated.currentBid);
      setStatus(updated.highestBidder === "me" ? "WIN" : "OUT");
    }
  });

  socket.off("BID_ERROR").on("BID_ERROR", () => setStatus("OUT"));

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">{item.title}</h2>

        <p className="text-3xl font-bold">${price}</p>

        <p className="text-sm text-gray-500">⏱ {secondsLeft}s left</p>

        {status === "WIN" && <Badge>Winning</Badge>}
        {status === "OUT" && <Badge variant="destructive">Outbid</Badge>}

        <Button
          disabled={secondsLeft === 0}
          onClick={() =>
            socket.emit("BID_PLACED", {
              itemId: item._id,
              amount: price + 10,
              user: "me",
            })
          }
          className="w-full"
        >
          Bid +10
        </Button>
      </CardContent>
    </Card>
  );
}
