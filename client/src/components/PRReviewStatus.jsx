import React, { useState, useEffect } from "react";
import axiosInstance from "../api/api";

const PRReviewStatus = ({ repoName, owner }) => {
	const [prs, setPRs] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPRs = async () => {
			try {
				const { data } = await axiosInstance.get(
					`/repositories/${owner}/${repoName}/prs`
				);
				setPRs(data);
			} catch (error) {
				console.error("Error fetching PRs:", error);
				setError("Failed to fetch PRs");
			}
		};
		fetchPRs();
	}, [repoName, owner]);

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div>
			<h3>Pull Request Review Status</h3>
			{prs.length === 0 ? (
				<p>No open pull requests.</p>
			) : (
				<ul>
					{prs.map((pr) => (
						<li key={pr.number}>
							PR #{pr.number}: {pr.title} - {pr.reviewStatus}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default PRReviewStatus;
