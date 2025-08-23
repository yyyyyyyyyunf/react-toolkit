import React from "react";
import ReactDOM from "react-dom/client";
import BenchmarkApp from "./BenchmarkApp.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<BenchmarkApp />
		</React.StrictMode>,
	);
}
