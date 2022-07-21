"use strict";
const { Router } = require("express");
const { signup, login } = require('./controller');
const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route
route.post("/signup", signup);
route.post("/login", login);

module.exports = route;