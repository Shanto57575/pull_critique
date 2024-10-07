import express from 'express';
import { handlePullRequestWebhook } from '../controllers/webhook.controller.js';

const webhookRouter = express.Router();

webhookRouter.post('/pr-review', handlePullRequestWebhook);

export default webhookRouter;