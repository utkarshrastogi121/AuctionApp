import { useEffect, useState } from "react";
import AuctionCard from "../components/AuctionCard";
import type { AuctionItem } from "../types/auction";
import api from "../api/axios";

export default function Dashboard() {
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get<AuctionItem[]>("/items");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load items", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading auctions...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <AuctionCard key={item._id} item={item} />
      ))}
    </div>
  );
}
