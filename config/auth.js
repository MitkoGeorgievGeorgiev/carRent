module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.render('user/login');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.render('user/login');
        }
    },
    isAnonymous: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    }
}