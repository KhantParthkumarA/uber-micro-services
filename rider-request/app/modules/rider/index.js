'use strict';
import { Router } from 'express';
import * as controller from './controller';
const { verifyLogin } = require('./../../routes/auth-middleware')
const route = Router();

route.post("/rider/signup", controller.signup);
route.post("/rider/login", controller.login);

route.post('/createRider', controller.create);
route.get('/estimates/price', verifyLogin, controller.getPriceEstimate);
route.get('/estimates/time', verifyLogin, controller.getTimeEstimate);
route.post('/requests/estimate', verifyLogin, controller.rideRequestEstimate);
route.post('/requests', verifyLogin, controller.rideRequest);
route.get('/requests/current', verifyLogin, controller.getCurrentRequest);
route.patch('/requests/current', verifyLogin, controller.updateCurrentRequest);
route.delete('/requests/current', verifyLogin, controller.deleteCurrentRequest);

route.get('/requests/:request_id', verifyLogin, controller.getRequest)
route.patch('/requests/:request_id', verifyLogin, controller.updateRequest)
route.delete('/requests/:request_id', verifyLogin, controller.deleteRequest)
route.get('/requests/:request_id/receipt', verifyLogin, controller.getReceipt);

route.post('/makeCall', controller.makeCalls);

route.get('/heatMap', controller.heatmapData);
route.patch('/favouriteDriver/:rider_id', verifyLogin, controller.addfavDriver)
route.patch('/waitingCharge/:rider_id', verifyLogin, controller.updateWaitingCharges)

route.post('/order', verifyLogin, controller.createOrder);
route.get('/order/:id', verifyLogin, controller.getOrder);
route.get('/order', verifyLogin, controller.getAllOrder);
route.patch('/order/:id', verifyLogin, controller.updateOrder);
export default route;






