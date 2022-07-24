"use strict";
const { Router } = require("express");
const { signup, login, companyEarning, createSetting, updateSetting } = require('../controller/user.controller');
const { adminPassport } = require('./../../routes/middleware');
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route
route.post("/signup", signup);
route.post("/login", login);

route.post('/setting', adminPassport, createSetting);
route.patch('/setting/:id', adminPassport, updateSetting);
route.get("/companyEarning", adminPassport, companyEarning)

module.exports = route;