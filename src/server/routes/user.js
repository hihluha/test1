const express = require('express');
const bcrypt = require('bcrypt');

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const router = express.Router();
const User = require("../models/User");
const isAuth = require("../auth/isAuthenticated");

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        (username, password, done) => {
            User.findOne({ email: username }, (err, user) => {
                if (err) return done(err);
                if (!user) return done(null, false);
                const passwordIsValid = bcrypt.compareSync(password, user.password);
                if (!passwordIsValid) return done(null, false);
                return done(null, user);
            });
        }
    )
);


router.post('/sign_in', passport.authenticate("local"), (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send( "Error on the server");
        if (!user) return res.status(404).send("Incorrect email or password");

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        console.log(passwordIsValid, 'passwordIsValid');
        if (!passwordIsValid)
            return res.status(401).send( "Incorrect email or password" );

        req.session.user = { id: user._id, name: user.name };
                   res.status(200).send({ auth: true });
        })

});

router.post('/logout', isAuth.isAuthenticated, (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.clearCookie('session');
        res.status(200).send({ auth: false });
    });
});


module.exports = router;