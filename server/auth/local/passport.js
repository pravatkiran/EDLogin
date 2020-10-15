import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
const bcrypt = require('bcrypt');

function localAuthenticate(User, username, password, done) {
    User.find({
        where: {
            username: username.toLowerCase()
        }
    })
        .then(user => {
            if(!user) {
                return done(null, false, {
                    message: 'This User is not registered.'
                });
            }
            bcrypt.compare(password, user.password, (err,result)=>{
                if(err) {
                    return done(null, false, {message: 'Password is incorrect.'})
                }

                return done(null, user);
            })
            // user.authenticate(password, function(authError, authenticated) {
            //     console.log('inside user.authenticate');
            //     console.log(authError, authenticated);
            //     if(authError) {
            //         return done(authError);
            //     }
            //     if(!authenticated) {
            //         return done(null, false, { message: 'This password is not correct.' });
            //     } else {
            //         console.log('user', user);
            //         return done(null, user);
            //     }
            // });
        })
        .catch(err => done(err));
}

export function setup(User/*, config*/) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password' // this is the virtual field on the model
    }, function(username, password, done) {
        return localAuthenticate(User, username, password, done);
    }));
}
