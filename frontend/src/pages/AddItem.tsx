import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [endsAt, setEndsAt] = useState("");

  const submit = async () => {
    await api.post("/items", {
      title,
      startingPrice: price,
      endsAt,
    });

    navigate("/");
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Auction Item</h2>

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Item title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="w-full mb-3 p-2 border rounded"
        placeholder="Starting price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <input
        type="datetime-local"
        className="w-full mb-4 p-2 border rounded"
        value={endsAt}
        onChange={(e) => setEndsAt(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-black text-white py-2 rounded hover:opacity-90"
      >
        Create Item
      </button>
    </div>
  );
}
