const getSignIn = (req, res, next) => {
    if(req.isAuthenticated()){
        let user = req.user
        console.log('user logueado')
        res.render('products.hbs', {user})
    }
    return res.render('signin.hbs')
}

const signIn = async(req, res, next) => {
    let user = req.email
    res.render('index.hbs', {user})
}

const getFailSignIn = (req, res, next) => {
    return res.render('failsignin.hbs')
}

const getSignUp = (req, res) => {
    return res.render('signup.hbs')
}

const getFailSignUp = (req, res) => {
    return res.render('failsignup.hbs')
}

const signUp = async(req, res, next) => {
    let user = req.user
    return res.render('failsignup.hbs')
}


const signOut = function(req, res, next){
    console.log(req.email)
    let user = req.email
    req.logout(function(err) {
      if (err) { return next(err); }
      res.render('logout.hbs', {user});
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