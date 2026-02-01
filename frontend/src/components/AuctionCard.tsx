import { useEffect, useState } from "react";
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

  const formatTime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(secondsLeft);

  useEffect(() => {
    const handleUpdateBid = (updated: AuctionItem) => {
      if (updated._id === item._id) {
        setPrice(updated.currentBid);
        setStatus(updated.highestBidder === "me" ? "WIN" : "OUT");
      }
    };

    const handleBidError = () => setStatus("OUT");

    socket.on("UPDATE_BID", handleUpdateBid);
    socket.on("BID_ERROR", handleBidError);

    return () => {
      socket.off("UPDATE_BID", handleUpdateBid);
      socket.off("BID_ERROR", handleBidError);
    };
  }, [item._id]);

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">{item.title}</h2>

        <p className="text-3xl font-bold">${price}</p>

        <div
          className={`flex gap-4 text-center ${
            secondsLeft <= 10 ? "text-red-500 font-semibold" : "text-gray-600"
          }`}
        >
          <div>
            <p className="text-lg font-bold">{days}</p>
            <p className="text-xs">Days</p>
          </div>
          <div>
            <p className="text-lg font-bold">{hours}</p>
            <p className="text-xs">Hours</p>
          </div>
          <div>
            <p className="text-lg font-bold">{minutes}</p>
            <p className="text-xs">Min</p>
          </div>
          <div>
            <p className="text-lg font-bold">{seconds}</p>
            <p className="text-xs">Sec</p>
          </div>
        </div>

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
