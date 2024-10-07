import axios from "axios";
import Repository from "../models/repository.model.js"

const getAllRepositories = async (req, res) => {
    try {
        const repositories = await Repository.find({ userId: req.user._id });
        console.log("All repositories =>", repositories)
        res.json(repositories);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        res.status(500).json({ error: 'Failed to fetch repositories', details: error.message });
    }
};

const createWebHook = async (req, res) => {
    const { repoName, owner } = req.body
    const token = req.user.accessToken
    const webhookUrl = `${process.env.SERVER_URL}/webhook/pr-review`;
    console.log(process.env.SERVER_URL)

    try {
        const response = await axios.post(`https://api.github.com/repos/${owner}/${repoName}/hooks`,
            {
                name: 'web',
                active: true,
                events: ['pull_request'],
                config: {
                    url: webhookUrl,
                    content_type: 'json'
                }
            },
            {
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )

        const webHookId = response.data.id;
        const newRepo = new Repository({
            owner,
            name: repoName,
            webHookId,
            userId: req.user._id
        })

        await newRepo.save()
        res.status(200).json({ message: 'Webhook created', data: response.data });
    } catch (error) {
        console.error('Error creating webhook:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to create webhook', error: error.message })
    }
}

const getPRStatus = async (req, res) => {
    const { owner, repo } = req.params;
    const token = req.user.accessToken;

    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            headers: {
                Authorization: `token ${token}`,
            }
        });

        const prs = response.data.map(pr => ({
            number: pr.number,
            title: pr.title,
            reviewStatus: pr.reviewStatus || 'Pending'
        }));

        res.json(prs);
    } catch (error) {
        console.error('Error fetching PRs:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch PRs', details: error.message });
    }
};


export { createWebHook, getPRStatus, getAllRepositories }
