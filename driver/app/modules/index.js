'use strict';
import { Router } from 'express';
import * as controller from './controller';

const route = Router();

route.patch('/updateVehicleDetails/:driverId/:productId', controller.updateVehicleDetail);
route.patch('/cancleRide/:driverId/:orderId', controller.cancleRide);
route.patch('/updateRideStatus/:driverId/:orderId', controller.updateStatus);
route.post('/confirmRide', controller.craeteOrderAndConfirmRide);
route.get('/upcomingTrip/:driverId', controller.upcomingTrip)
export default route;






