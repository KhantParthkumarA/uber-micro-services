"use strict";
const { Router } = require("express");
const {
    scheduleRide,
    liveLocationRider
} = require('./controller');
const route = Router();


route.get("/scheduleRide", scheduleRide)
route.get("/rider/liveLocation", liveLocationRider);

module.exports = route;
