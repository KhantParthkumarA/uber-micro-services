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
} = require('./controller');
const { verifyLogin } = require('./../../routes/auth-middleware')
const route = Router();

//driver

route.get("/driver/detailsWithRideHistory", verifyLogin, driverDetailWithRideHistory);
route.get("/driver/earning/:id", verifyLogin, driverEarning);

route.get("/driver/livelocation", verifyLogin, driverLiveLocation);
route.get("/driver/unapprove", verifyLogin, unapproveDriver);
route.get("/driver/approve", verifyLogin, approveDriver);


route.post("/driver", verifyLogin, createDriver);
route.get("/driver/:id", verifyLogin, getDriver)
route.get("/driver", verifyLogin, getAllDriver);
route.delete("/driver/:id", verifyLogin, deleteDriver);
route.patch("/driver/:id", verifyLogin, updateDriver);



module.exports = route;
