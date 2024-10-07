import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<div className="min-h-screen bg-[#24292e] text-white font-serif">
		<App />
	</div>
);
