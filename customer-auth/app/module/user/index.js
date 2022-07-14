"use strict";
const { Router } = require("express");
const { joiValidator } = require("iyasunday");
const { guard } = require("../../utils/middleware");
const validation = require("./validation");
const { signup, login, oAuth } = require('./controller');
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route
route.post("/user/signup", signup);
route.post("/user/login", login);
route.post("/user/oAuth", oAuth);

module.exports = route;
