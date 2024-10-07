import express from 'express'
import isAuthenticated from '../middlewares/auth.middleware.js'
import { createWebHook, getPRStatus, getAllRepositories } from '../controllers/repository.controller.js';

const repositoryRouter = express.Router()

repositoryRouter.get('/', isAuthenticated, getAllRepositories);
repositoryRouter.post('/create-webhook', isAuthenticated, createWebHook)
repositoryRouter.get('/:owner/:repo/prs', isAuthenticated, getPRStatus);

export default repositoryRouter