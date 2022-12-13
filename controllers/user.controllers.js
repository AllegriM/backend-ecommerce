const signUp = async(req, res, next) => {
    const { email, password } = req.body
    res.send({message: email, password})
}

const signIn = async(req, res, next) => {
    const { name } = req.body
    if (!name) return res.status(400).json({error: "Provide a valid name"})
    req.session.name = name
    return res.redirect("products")
}

const signOut = async(req, res) => {
   req.session.destroy(err => {
    if (err){
        return res.json({ status: "Logout ERROR", body: err })
    }
    res.render("logout.hbs")
   }) 
}

module.exports = {
    signIn,
    signUp,
    signOut
}