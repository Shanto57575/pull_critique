import express from 'express';
import { getToken, gihubAuth, githubCallback } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/github', gihubAuth);
authRouter.get('/github/callback', githubCallback, (req, res) => {
    res.redirect('http://localhost:5173');
});

authRouter.get('/token', getToken);

export default authRouter;
