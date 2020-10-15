
// import { User } from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
var db = require('../../sqldb'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
var User = db.User;

function trimQuotes(data) {
    return data.replace(/"/g, "'");
}
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        // console.log('entity', entity);
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}
function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        return res.status(statusCode).json(err);
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        // console.log('err', err);
        return res.status(statusCode).send(err);
    };
}

exports.create = async (req, res) => {
    try {
        await bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            // hash password
            bcrypt.hash(req.body.password, salt, async (err, result) => {
                if (err) throw err;

                req.body.password = result;

                let newUser = await User.create(req.body);
                if (!newUser)
                    return res.status(422).json({ status: 'fail', message: 'Error while creating user.' });
                return res.status(200).json({ status: 'ok', user: newUser });
            })
        })
    } catch (err) {
        console.log('Error', err);
    }
}
