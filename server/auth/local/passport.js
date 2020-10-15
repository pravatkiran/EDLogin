import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { bcrypt } from 'bcryptjs';

function localAuthenticate(User, emailid, password, done) {
    User.findOne({
        where: {
            emailid: emailid
            // UserName: UserName.toLowerCase()
        }
    })
        .then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'This User is not registered.'
                });
            }
            // user.authenticate(password, function(authError, authenticated) {
            //     if(authError) {
            //         return done(authError);
            //     }
            //     if(!authenticated) {
            //         return done(null, false, { message: 'This password is not correct.' });
            //     } else {
                // console.log('user', user);
            return done(null, user);
            //     }
            // });
        })
        .catch(err => done(err));
}

export function setup(User/*, config*/) {
    passport.use(new LocalStrategy({
        usernameField: 'emailid',
        passwordField: 'password' // this is the virtual field on the model
    }, function (emailid, password, done) {
        return localAuthenticate(User, emailid, password, done);
    }));
}
