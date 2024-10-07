import axios from 'axios';
import User from '../models/user.model.js';

export const handlePullRequestWebhook = async (req, res) => {
    const { action, pull_request, repository } = req.body;

    if (action === 'opened' || action === 'synchronize') {
        try {
            const user = await User.findOne({ username: repository.owner.login });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const prNumber = pull_request.number;
            const repoFullName = repository.full_name;

            // Fetch PR diff
            const diffUrl = `https://api.github.com/repos/${repoFullName}/pulls/${prNumber}`;
            const { data: prData } = await axios.get(diffUrl, {
                headers: { Authorization: `token ${user.accessToken}` }
            });

            // Use an AI model to review the PR (replace with actual AI integration)
            const aiReview = await reviewPullRequest(prData.diff_url);

            // Post the review as a comment
            const commentUrl = `https://api.github.com/repos/${repoFullName}/issues/${prNumber}/comments`;
            await axios.post(commentUrl, { body: aiReview }, {
                headers: { Authorization: `token ${user.accessToken}` }
            });

            res.status(200).json({ message: 'PR reviewed successfully' });
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(200).json({ message: 'Ignoring non-open/synchronize event' });
    }
};

// Placeholder function for AI review (replace with actual AI integration)
async function reviewPullRequest(diffUrl) {
    // Implement your AI review logic here
    return `AI Review:
    1. The code looks good overall.
    2. Consider adding more comments for complex logic.
    3. There might be a potential performance issue in function X.
    
    Please review these suggestions and make necessary changes.`;
}