import { useEffect, useState } from "react";
import AuctionCard from "../components/AuctionCard";
import type { AuctionItem } from "../types/auction";

export default function Dashboard() {
  const [items, setItems] = useState<AuctionItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <AuctionCard key={item._id} item={item} />
      ))}
    </div>
  );
}
