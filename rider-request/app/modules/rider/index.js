'use strict';
import { Router } from 'express';
// import { joiValidator } from 'iyasunday';
import * as controller from './controller';
// import validation from './validator';

const route = Router();

route.post('/create', controller.create);

export default route;






