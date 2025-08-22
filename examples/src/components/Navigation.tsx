// import React from "react"; // 未使用
import { routes } from "../utils/routes";

interface NavigationProps {
	currentPath: string;
	onNavigate: (path: string) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
	return (
		<nav className="navigation">
			<div className="nav-header">
				<h1>@fly4react/observer Examples</h1>
				<p>React Intersection Observer 工具库示例集合</p>
			</div>

			<div className="nav-links">
				{routes.map((route) => (
					<button
						type="button"
						key={route.path}
						className={`nav-link ${currentPath === route.path ? "active" : ""}`}
						onClick={() => onNavigate(route.path)}
					>
						<h3>{route.name}</h3>
						<p>{route.description}</p>
					</button>
				))}
			</div>
		</nav>
	);
}
