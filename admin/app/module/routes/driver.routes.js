"use strict";
const { Router } = require("express");
const {
    getAllDriver,
    getDriver,
    deleteDriver,
    createDriver,
    updateDriver,
    driverLiveLocation,
    unapproveDriver,
    approveDriver,
    driverEarning,
    driverDetailWithRideHistory
} = require('../controller/driver.controller');
const { adminPassport } = require('./../../routes/middleware')
const route = Router();

//driver

route.get("/driver/detailsWithRideHistory", adminPassport, driverDetailWithRideHistory);
route.get("/driver/earning/:id", adminPassport, driverEarning);

route.get("/driver/livelocation", adminPassport, driverLiveLocation);
route.get("/driver/unapprove", adminPassport, unapproveDriver);
route.get("/driver/approve", adminPassport, approveDriver);


route.post("/driver", adminPassport, createDriver);
route.get("/driver/:id", adminPassport, getDriver)
route.get("/driver", adminPassport, getAllDriver);
route.delete("/driver/:id", adminPassport, deleteDriver);
route.patch("/driver/:id", adminPassport, updateDriver);



module.exports = route;
