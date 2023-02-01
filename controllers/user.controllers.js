const logger = require("../middlewares/logs.middleware");

const getSignIn = (req, res, next) => {
    logger.info('[GET] => /login');
    res.sendFile('signin.html', { root: 'public' });
}

const signIn = async (req, res, next) => {
    try {
        let user = req.email
        return res.render('home.hbs', { user })
    } catch (error) {
        console.log(error)
    }
}

const getFailSignIn = (req, res, next) => {
    return res.render('failsignin.hbs')
}

const getSignUp = (req, res) => {
    logger.info('[GET] => /register');
    res.sendFile('signup.html', { root: 'public' });
}

const getFailSignUp = (req, res) => {
    return res.render('failsignup.hbs')
}

const signUp = async (req, res, next) => {
    let user = req.user
    return res.render('failsignup.hbs')
}


const signOut = function (req, res, next) {
    console.log(req.email)
    let user = req.email
    req.logout(function (err) {
        if (err) { return next(err); }
        res.render('logout.hbs', { user });
    })
};


module.exports = {
    getSignIn,
    signIn,
    getFailSignIn,
    getSignUp,
    signUp,
    getFailSignUp,
    signOut
}