'use strict';
import { Router } from 'express';
// import { joiValidator } from 'iyasunday';
import * as controller from './controller';
// import validation from './validator';

const route = Router();

route.post('/create', controller.create);
route.get('/estimates/price', controller.getPriceEstimate);
route.get('/estimates/time', controller.getTimeEstimate);
route.post('/requests/estimate', controller.rideRequestEstimate);
route.post('/requests', controller.rideRequest);
route.get('/requests/current', controller.getCurrentRequest);
route.patch('/requests/current', controller.updateCurrentRequest);
route.delete('/requests/current', controller.deleteCurrentRequest);



route.get('/requests/:request_id', controller.getRequest)
route.patch('/requests/:request_id', controller.updateRequest)
route.delete('/requests/:request_id', controller.deleteRequest)
route.get('/requests/:request_id/receipt', controller.getReceipt);

route.post('/makeCall', controller.makeCall);
export default route;






