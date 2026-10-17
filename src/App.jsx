import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive";

export default function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("notex-theme") === "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("notex-theme", dark ? "dark" : "light");
  }, [dark]);
  const shared = { dark, onToggleTheme: () => setDark((value) => !value) };
  return (
    <Routes>
      <Route path="/" element={<Home {...shared} />} />
      <Route path="/important" element={<Home {...shared} importantOnly />} />
      <Route path="/archive" element={<Archive {...shared} />} />
      <Route path="/bin" element={<Archive {...shared} trashOnly />} />
      <Route path="*" element={<Home {...shared} />} />
    </Routes>
  );
}
