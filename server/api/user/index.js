import {Router} from 'express';
import * as controller from './user.controller';
// import * as auth from '../../auth/auth.service';

var router = Router();


router.post('/getUserList', controller.getUserList);
router.get('/getRoleLists', controller.getRoleLists);
router.get('/getRoleById/:id', controller.getRoleById);
router.post('/getEmailId', controller.getEmailId);
router.get('/getDepartment', controller.getDepartments);
router.post('/createUser', controller.createUsers);
router.put('/updateUser/:id', controller.updateUser);
router.delete('/deleteUser/:id', controller.deleteUser);
router.post('/setPermission', controller.setDivisionPermission);
router.get('/getCustomer', controller.getCustomer);
router.get('/getUserDetails/:id', controller.getUserDetails);
router.post('/createUserApi', controller.createUserApi);

module.exports = router;
