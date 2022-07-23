"use strict";
const { Router } = require("express");
const { signup, login, companyEarning, createSetting, updateSetting } = require('./controller');
const { verifyLogin } = require('./../../routes/auth-middleware');
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route
route.post("/signup", signup);
route.post("/login", login);

route.post('/setting', verifyLogin, createSetting);
route.patch('/setting/:id', verifyLogin, updateSetting);
route.get("/companyEarning", verifyLogin, companyEarning)

module.exports = route;