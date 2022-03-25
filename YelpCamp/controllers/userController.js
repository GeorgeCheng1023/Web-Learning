const User = require('../models/user');
module.exports.toRegist = (req, res, next) => {
    res.render('users/regist');
}

module.exports.regist = async(req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, username });
        const registUser = await User.register(user, password);
        req.login(registUser, err => {
            if (err) return next(err);
            req.flash('success', 'You have successfully registered')
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', 'Username or email already registered')
        res.redirect('/users/regist');
    }
};

module.exports.toLogin = (req, res) => {
    res.render('users/login')
};

module.exports.login = async(req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logout!');
    res.redirect('/');
};