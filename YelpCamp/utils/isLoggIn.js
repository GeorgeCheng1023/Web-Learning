module.exports = (req, res, next) => {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in')
        return res.redirect('/users/login')
    }
    next()
}