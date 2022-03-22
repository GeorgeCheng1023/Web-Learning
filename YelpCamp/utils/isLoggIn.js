module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in')
        return res.redirect('/users/login')
    }
    next()
}