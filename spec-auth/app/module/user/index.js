"use strict";
import { Router } from "express";
import { joiValidator } from "iyasunday";
import { guard } from "../../utils/middleware";
import * as controller from "./controller";
import validation from "./validation";

const route = Router();

//here, you define your route and use the {guard = ""} if the route has a permission case

//This is an example of a signup route
route.post("/user/signup", joiValidator(validation.signup), controller.signup);

export default route;
