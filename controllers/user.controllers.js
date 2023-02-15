const logger = require("../middlewares/logs.middleware");
const userService = require('../services/users.service')

const User = new userService()

class UserController {
    getSignIn = (req, res, next) => {
        try {
            logger.info('[GET] => /login');
            res.sendFile('signin.html', { root: 'public' });
        } catch (error) {
            logger.error(error)
        }
    }

    getFailSignIn = (req, res, next) => {
        try {
            return res.render('failsignin.hbs')
        } catch (error) {
            logger.error(error)
        }
    }

    getSignUp = (req, res) => {
        try {
            logger.info('[GET] => /register');
            res.sendFile('signup.html', { root: 'public' });
        } catch (error) {
            logger.error(error)
        }
    }

    getFailSignUp = (req, res) => {
        try {
            return res.render('failsignup.hbs')
        } catch (error) {
            logger.error(error)
        }
    }

    async signOut(req, res, next) {
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

    async getAll(req, res, next) {
        try {
            const users = await User.getAll();
            const response = successResponse(users);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const user = await User.getById(id);
            const response = successResponse(user);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async save(req, res, next) {
        try {
            const user = {
                _id: Mongoose.Types.ObjectId(),
                ...req.body,
            };
            await User.save(user);
            const response = successResponse(user);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            const updatedUser = {
                _id: id,
                ...req.body,
            };
            await User.update(id, req.body);
            const response = successResponse(updatedUser);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        const { id } = req.params;
        try {
            const deletedUser = await User.delete(id);
            const response = successResponse(deletedUser);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new UserController();