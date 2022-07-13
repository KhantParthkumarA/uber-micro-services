'use strict';
import { Router } from 'express';
import { joiValidator } from 'iyasunday';
import * as controller from './controller';
import validation from './validation';

const route = Router();

route.post(
    '/signup',
    joiValidator(validation.signup),
    controller.signup);

route.post(
    '/login',
    joiValidator(validation.login),
    controller.login);

route.post(
    '/update',
    joiValidator(validation.update),
    controller.update);

export default route;






