import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddItem from "../pages/AddItem";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddItem />} />
    </Routes>
  );
}
