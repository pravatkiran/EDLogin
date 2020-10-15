import express from 'express';
import passport from 'passport';
// import { bcrypt } from 'bcryptjs';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (user != null) {
            // console.log('body', req.body);
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                console.log('err', err);
                console.log('result', result);
                if (result === true) {
                    const token = jwt.sign({
                        emailid: user.emailid,
                        userid: user.userid
                    }, 'supersecretkey', { expiresIn: '1d' });
                    // console.log('token', token);
                    // console.log('user', user);
                    let tokenCreatedTime = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
                    return res.status(200).json({
                        status: 'ok', token: token, id: user.userid, tokenCreatedTime: tokenCreatedTime,
                        username: user.username, emailid: user.emailid, userroletypeid: user.userroletypeid,
                        usertitle: user.usertitle, customerId: user.customerId, company_id: user.company_id
                    });
                } else {
                    return res.status(401).json({ status: 'fail', msg: 'Password is incorrect' });
                }
            })
        }
    })(req, res, next);
});

export default router;
