import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "../components/AuctionCard";
import type { AuctionItem } from "../types/auction";
import api from "../api/axios";

export default function Dashboard() {
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.items ?? [];

        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Live Auctions</h2>

        <button
          onClick={() => navigate("/add")}
          className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90"
        >
          + Add Auction
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.length === 0 && (
          <p className="text-gray-500">No auctions yet</p>
        )}

        {items.map((item) => (
          <AuctionCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
}
