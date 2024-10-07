import React, { useState } from "react";
import { createWebHook } from "../api/api";

const CreateWebhook = () => {
	const [repoName, setRepoName] = useState("");
	const [owner, setOwner] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await createWebHook({ repoName, owner });
			setMessage("Webhook Created Successfully");
			console.log(response);
		} catch (error) {
			setMessage("Error Creating Webhook");
			console.error(error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="repoName">Repository Name:</label>
					<input
						className="border p-2 w-full bg-gray-900 rounded mt-2"
						type="text"
						name="repoName"
						value={repoName}
						onChange={(e) => setRepoName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="block">Owner:</label>
					<input
						type="text"
						className="border p-2 w-full bg-gray-900 rounded mt-2"
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Create Webhook
				</button>
			</form>
			{message && <p className="mt-4">{message}</p>}
		</div>
	);
};

export default CreateWebhook;
