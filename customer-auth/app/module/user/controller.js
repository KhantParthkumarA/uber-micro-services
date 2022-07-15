import { func } from "joi";
import * as service from "./service";

//Here is where you write your controller

//Example here is a signup controller.
//Kindly edit the controller name and replace it with your controller name
export async function signup(req, res, next) {
  try {
    res.status(200).json(await service.signup(req.body));
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    res.status(200).json(await service.login(req.body));
  } catch (err) {
    next(err);
  }
}

export async function oAuth(req, res, next) {
  try {
    res.status(200).json(await service.oAuth(req.body));
  } catch (err) {
    next(err);
  }
}

export async function loginVerify(req, res, next) {
  try {
    res.status(200).json(await service.loginVerify(req.body));
  } catch (err) {
    next(err);
  }
}

export async function getAllProduct(req, res, next) {
  try {
    res.status(200).json(await service.getAllProduct());
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    res.status(200).json(await service.getProduct(req.params.id));
  } catch (err) {
    next(err);
  }
}