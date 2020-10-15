import {Router} from 'express';
import * as controller from './user.controller';
// import * as auth from '../../auth/auth.service';

var router = Router();


router.post('/', controller.create);

module.exports = router;
