import passport from "../config/passport.js";

const gihubAuth = passport.authenticate('github', { scope: ['repo', 'write:repo_hook'] });

const githubCallback = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.error('Authentication failed:', info);
            return res.redirect('http://localhost:5173/login-failed');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }
            console.log('User authenticated:', user);
            return res.redirect('http://localhost:5173');
        });
    })(req, res, next);
};

const getToken = (req, res) => {
    if (req.isAuthenticated() && req.user && req.user.accessToken) {
        res.json({ token: req.user.accessToken });
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
};

export {
    gihubAuth,
    githubCallback,
    getToken
};
