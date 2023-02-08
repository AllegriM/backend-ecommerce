const logger = require("../middlewares/logs.middleware");

const getSignIn = (req, res, next) => {
    logger.info('[GET] => /login');
    res.sendFile('signin.html', { root: 'public' });
}

// const signIn = async (req, res, next) => {
//     let user = req.user
//     console.log(user)
//     try {
//         if (user) {
//             console.log("Voy a redirigir al home con esta info", user)
//             return res.render('home.hbs', { user })
//         }
//         return res.sendFile('signin.html', { root: 'public' });
//     } catch (error) {
//         console.log(error)
//     }
// }

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

// const signUp = async (req, res, next) => {
//     try {
//         let user = req.user
//         if (user) {
//             return res.sendFile('signin.html')
//         }
//         return res.redirect('/failsignup');
//     }
//     catch (error) {
//         next(error)
//     }
// }


const signOut = async function (req, res, next) {
    logger.info('[GET] => /logout');
    try {
        await req.session.destroy((err) => {
            if (err) {
                logger.error(err);
                res.clearCookie('user-session');
            } else {
                res.clearCookie('user-session');
                res.redirect('/signin')
            }
        });
    } catch (err) {
        logger.error(err);
    }
};


module.exports = {
    getSignIn,
    // signIn,
    getFailSignIn,
    getSignUp,
    // signUp,
    getFailSignUp,
    signOut
}