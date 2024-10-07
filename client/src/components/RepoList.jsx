import React, { useState, useEffect } from "react";
import axiosInstance from "../api/api";
import PRReviewStatus from "./PRReviewStatus";

const RepoList = () => {
	const [repositories, setRepositories] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const { data } = await axiosInstance.get("/repositories");
				setRepositories(data);
			} catch (error) {
				console.error("Error fetching repositories:", error);
				setError("Failed to fetch repositories. Please try again.");
			}
		};
		fetchRepos();
	}, []);

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div>
			<h2 className="text-lg font-bold mb-4">Your Repositories</h2>
			{repositories.length === 0 ? (
				<p>No repositories found. Create a webhook first.</p>
			) : (
				<ul>
					{repositories.map((repo) => (
						<li key={repo._id} className="border p-2 mb-2">
							<p>{repo.name}</p>
							<p>Owner: {repo.owner}</p>
							<PRReviewStatus repoName={repo.name} owner={repo.owner} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RepoList;
