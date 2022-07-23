"use strict";
const { Router } = require("express");
const {
    scheduleRide,
    liveLocationRider,
    completeRideDetails,
    cancleRideDetails
} = require('./controller');
const { verifyLogin } = require('./../../routes/auth-middleware');
const route = Router();

route.get("/cancleRide", verifyLogin, cancleRideDetails)
route.get("/completeRide", verifyLogin, completeRideDetails);
route.get("/scheduleRide", verifyLogin, scheduleRide)
route.get("/rider/liveLocation", verifyLogin, liveLocationRider);

module.exports = route;
