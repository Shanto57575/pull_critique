const OAuthButton = () => {
	const handleOAuth = () => {
		window.location.href = "http://localhost:3000/auth/github";
	};

	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={handleOAuth}
		>
			Connect with GitHub
		</button>
	);
};

export default OAuthButton;
