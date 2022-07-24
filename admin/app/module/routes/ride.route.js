"use strict";
const { Router } = require("express");
const {
    scheduleRide,
    liveLocationRider,
    completeRideDetails,
    cancleRideDetails
} = require('../controller/ride.controller');
const { adminPassport } = require('./../../routes/middleware');
const route = Router();

route.get("/cancleRide", adminPassport, cancleRideDetails)
route.get("/completeRide", adminPassport, completeRideDetails);
route.get("/scheduleRide", adminPassport, scheduleRide)
route.get("/rider/liveLocation", adminPassport, liveLocationRider);

module.exports = route;
