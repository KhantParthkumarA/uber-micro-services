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
    approveDriver
} = require('./controller');
const route = Router();

//driver
route.get("/driver/livelocation", driverLiveLocation);
route.get("/driver/unapprove", unapproveDriver);
route.get("/driver/approve", approveDriver);

route.post("/driver", createDriver);
route.get("/driver/:id", getDriver)
route.get("/driver", getAllDriver);
route.delete("/driver/:id", deleteDriver);
route.patch("/driver/:id", updateDriver);


module.exports = route;
