'use strict';
import { Router } from 'express';
import * as controller from './controller';
import { driverPassport } from '../routes/middleware'
const route = Router();

route.patch('/updateVehicleDetails/:driverId/:productId', driverPassport, controller.updateVehicleDetail);
route.patch('/cancleRide/:driverId/:orderId', driverPassport, controller.cancleRide);
route.patch('/updateRideStatus/:driverId/:orderId', driverPassport, controller.updateStatus);
route.post('/confirmRide', driverPassport, controller.craeteOrderAndConfirmRide);
route.post('/updateEta', driverPassport, controller.craeteOrderAndConfirmRide);
route.get('/upcomingTrip/:driverId', driverPassport, controller.upcomingTrip)

export default route;