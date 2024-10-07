import { useState, useEffect } from "react";
import axiosInstance from "./api/api";
import OAuthButton from "./components/OAuthButton";
import RepoList from "./components/RepoList";
import CreateWebhook from "./components/CreateWebhook";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axiosInstance.get("/auth/token");

				if (response.data.token) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error("Error checking authentication status:", error);
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	return (
		<div>
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">GitHub PR Review System</h1>

				{!isAuthenticated ? (
					<OAuthButton />
				) : (
					<div>
						<RepoList />
						<CreateWebhook />
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
