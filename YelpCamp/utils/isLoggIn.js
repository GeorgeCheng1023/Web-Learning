module.exports = (req, res, next) => {
    console.log(req.originalUrl);
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in')
        return res.redirect('/users/login')
    }
    next()
}