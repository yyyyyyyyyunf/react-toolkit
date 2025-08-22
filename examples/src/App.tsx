import { useState, Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { defaultRoute, routes } from "./utils/routes";

export default function App() {
	const [currentPath, setCurrentPath] = useState(defaultRoute.path);

	const currentRoute =
		routes.find((route) => route.path === currentPath) || defaultRoute;
	const CurrentComponent = currentRoute.component;

	return (
		<div className="app">
			<Navigation currentPath={currentPath} onNavigate={setCurrentPath} />

			<main className="main-content">
				<Suspense fallback={<div className="loading">加载中...</div>}>
					<CurrentComponent />
				</Suspense>
			</main>
		</div>
	);
}
