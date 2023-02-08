function isAuthenticated(req, res, next) {
    console.log('Estoy autenticado?:', req.isAuthenticated())
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/signin')
    }
}

module.exports = isAuthenticated