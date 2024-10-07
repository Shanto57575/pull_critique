const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("authenticated")
        return next()
    }
    res.status(401).json({ error: 'User Not Authenticated' })
}

export default isAuthenticated