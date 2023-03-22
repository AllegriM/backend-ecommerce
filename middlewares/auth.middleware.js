function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/signin')
    }
}

module.exports = isAuthenticated