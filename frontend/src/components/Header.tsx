import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-8 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          AuctionLive
        </Link>
      </div>
    </header>
  );
}
