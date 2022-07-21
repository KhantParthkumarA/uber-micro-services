"use strict";
const { Router } = require("express");
const {
    scheduleRide,
    liveLocationRider
} = require('./controller');
const { verifyLogin } = require('./../user/controller')
const route = Router();


route.get("/scheduleRide", verifyLogin, scheduleRide)
route.get("/rider/liveLocation", verifyLogin, liveLocationRider);

module.exports = route;
