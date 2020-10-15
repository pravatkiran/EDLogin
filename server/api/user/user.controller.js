
// import { User } from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
var crypto = require('crypto');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');

var db = require('../../sqldb'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
var User = db.User;
var DivisionPermission = db.DivisionPermission;
var Customer = db.Customer;

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


// get user list
export function getUserList(req, res) {

    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    // console.log('queryData', queryData);
    console.log('get user list called');
    console.log('customerId', req.body.customerId);
    // User.findAll({
    //     where: { customerId: req.body.customerId }
    // }).then(users => {
    //     res.status(200).send(users);
    // })
    sequelize.query('CALL BI_GetUserList(' + queryData + ')')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// get role
export function getRoleLists(req, res) {
    console.log('getRole');
    sequelize.query('CALL BI_GetRoles();')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// get role by id 
export function getRoleById(req, res) {
    sequelize.query('CALL Bi_GetRoleById(' + req.params.id + ')')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// get Department
export function getDepartments(req, res) {
    sequelize.query('CALL BI_GetUserDepartment();')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// get Emailid
export function getEmailId(req, res) {
    console.log('getEmailId api called');
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetEmail(' + queryData + ')')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// create user
export function createUsers(req, res) {
    // console.log('body', req.body);
    User.findOne({ where: { emailid: req.body.emailid } }).then(user => {
        if (user) {
            return res.status(320).json({msg: 'Email already exists'});
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                console.log('salt', salt);
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    //     if (err) throw err;
                    console.log('hash', hash);
                    var value = {
                        username: req.body.userName !== undefined ? req.body.userName : '',
                        // usertitle: req.body.userrolename !== undefined ? req.body.userrolename : req.body.role.userrolename,
                        customerId: req.body.customerId !== undefined ? req.body.customerId : '',
                        // deptid: req.body.department.deptid,
                        // userroletypeid: req.body.userroletypeid !== undefined ? req.body.userroletypeid : req.body.role.userroletypeid,
                        emailid: req.body.emailid !== undefined ? req.body.emailid : '',
                        company_id: req.body.company_id !== undefined ? req.body.company_id : '',
                        password: hash
                    }
                    if (req.body.userrolename !== undefined) {
                        value.usertitle = req.body.userrolename.userrolename;
                        value.userroletypeid = req.body.userrolename.userroletypeid;
                    } else {
                        value.usertitle = req.body.userrolename;
                        value.userroletypeid = req.body.userroletypeid;
                    }
                    // console.log('value', value);
                    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(value) + '"'.replace(/"/g, "'");
                    console.log('queryData', queryData);
                    sequelize.query('CALL BI_CreateUser(' + queryData + ')')
                        .then((user) => {
                            res.status(200).json({ status: 'ok', user: user })
                        })
                        .catch(handleError(res));
                })
            })
        }
    })


}

// update user
export function updateUser(req, res) {
    User.findOne({ where: { userid: req.params.id } }).then(user => {
        if (req.body.password !== user.password) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) throw err;
                if (result == false) {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            console.log('req.body', req.body);
                            var data = {
                                username: req.body.userName,
                                emailid: req.body.emailid,
                                password: hash,
                                usertitle: req.body.userrolename,
                                userroletypeid: req.body.userroletypeid
                            }
                            console.log('hash', hash);
                            User.update(data,
                                { where: { userid: req.params.id } })
                                .then(() => {
                                    res.status(200).json({ msg: 'Updated successfully.' });
                                })
                                .catch((err) => {
                                    console.log('error', err);
                                });
                        })
                    })
                }
            })
        } else {
            var data = {
                username: req.body.userName,
                emailid: req.body.emailid,
                userroletypeid: req.body.userroletypeid,
                usertitle: req.body.userrolename,
                password: req.body.password,
            }
            User.update(data,
                { where: { userid: req.params.id } }
            ).then(() => {
                res.status(200).json({ msg: "User updated successfully" });
            });
        }
    })
        .catch(handleError(res));
}

// delete user 
export function deleteUser(req, res) {
    console.log('delete', req.params.id);
    User.destroy({
        where: { userid: req.params.id }
    }).then(() => {
        res.status(200).json({ msg: 'User deleted successfully with id = ' + req.params.id });
    })
}

export function setDivisionPermission(req, res) {
    DivisionPermission.create(req.body).then(() => {
        res.status(200).json({ msg: 'Permission created successfully.' })
    }).catch(err => {
        res.status(500).json({ msg: 'Unable to create permission.' });
    })
}

// export function getUser(req, res) {
//     console.log('req.body', req.body);
//     var queryData = '"'.replace(/"/g, "'") + JSON.stringify(value) + '"'.replace(/"/g, "'");
//     console.log('queryData', queryData);
//     sequelize.query('CALL BI_CreateUser(' + queryData + ')')
//         .then(respondWithResult(res))
//         .catch(handleError(res));
// }

export function getCustomer(req, res) {
    Customer.findAll().then((customer) => {
        res.status(200).json(customer);
    }).catch(err => {
        res.status(500).json({ msg: 'Error while fetching customer' });
    })

}

export function getUserDetails(req, res) {
    console.log('id', req.params.id);
    User.findByPk(req.params.id).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log('error', err);
    })
}

export function createUserApi(req, res) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        console.log('salt', salt);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            //     if (err) throw err;
            console.log('hash', hash);
            var value = {
                username: req.body.username,
                usertitle: req.body.usertitle,
                customerId: req.body.customerid,
                userroletypeid: req.body.userroletypeid,
                emailid: req.body.emailid,
                company_id: req.body.companyid,
                password: hash
            }
            console.log('value', value);
            var queryData = '"'.replace(/"/g, "'") + JSON.stringify(value) + '"'.replace(/"/g, "'");
            console.log('queryData', queryData);
            User.create(value).then(user => {
                res.status(200).json({ message: 'User created successfully.' });
            }).catch(err => {
                console.log('Error', err);
            })
        })
    })
}


// export function getRoleByIdApi(req,res){

// }