'use strict';
import { Router } from 'express';
// import { joiValidator } from 'iyasunday';
import * as controller from './controller';
// import validation from './validator';

const route = Router();

route.post('/create', controller.create);
route.get('/estimates/price', controller.getPriceEstimate);
route.get('/estimates/time', controller.getTimeEstimate);
export default route;






