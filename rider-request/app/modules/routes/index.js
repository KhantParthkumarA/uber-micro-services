'use strict';
import { Router } from 'express';
import * as controller from '../controller/rider.controller';
const { riderPassport } = require('../../routes/middleware')
const route = Router();

route.post("/rider/signup", controller.signup);
route.post("/rider/login", controller.login);

route.post('/createRider', riderPassport, controller.create);
route.get('/estimates/price', riderPassport, controller.getPriceEstimate);
route.get('/estimates/time', riderPassport, controller.getTimeEstimate);
route.post('/requests/estimate', riderPassport, controller.rideRequestEstimate);
route.post('/requests', riderPassport, controller.rideRequest);
route.get('/requests/current', riderPassport, controller.getCurrentRequest);
route.patch('/requests/current', riderPassport, controller.updateCurrentRequest);
route.delete('/requests/current', riderPassport, controller.deleteCurrentRequest);

route.get('/requests/:request_id', riderPassport, controller.getRequest)
route.patch('/requests/:request_id', riderPassport, controller.updateRequest)
route.delete('/requests/:request_id', riderPassport, controller.deleteRequest)
route.get('/requests/:request_id/receipt', riderPassport, controller.getReceipt);

route.post('/makeCall', riderPassport, controller.makeCalls);

route.get('/heatMap', riderPassport, controller.heatmapData);
route.patch('/favouriteDriver/:rider_id', riderPassport, controller.addfavDriver)
route.patch('/waitingCharge/:rider_id', riderPassport, controller.updateWaitingCharges)

route.post('/order', riderPassport, controller.createOrder);
route.get('/order/:id', riderPassport, controller.getOrder);
route.get('/order', riderPassport, controller.getAllOrder);
route.patch('/order/:id', riderPassport, controller.updateOrder);

route.patch('/cancleRide/:riderId/:orderId', riderPassport, controller.cancleRide);
route.post('/getRideETA', riderPassport, controller.rideEta);
route.patch('/rateDriver/:riderId', riderPassport, controller.rateDriver);
route.get('/shareRideDetails/:orderId', riderPassport, controller.rideDetails);
route.get('/fareCalculation/:productId', riderPassport, controller.fareCalculation);

route.patch('/saveRiderLocation', riderPassport, controller.saveRiderLocation);
route.get('/pickupNotification', riderPassport, controller.pickupNotification);
export default route;






