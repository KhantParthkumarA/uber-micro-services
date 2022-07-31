'use strict';
import bodyParser from 'body-parser';
import cors from 'cors';
import { raw } from 'express';
import models from '../module/model'
const io = require('socket.io')();
const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded
}

const customerIoAuth = (socket, next) => {
  /** Feat io passport here */
  next();
}

export default app => {
  if (process.env.NODE_ENV === 'production') {
    console.log("Production");
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(raw());

  io.use(customerIoAuth);

  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} >> ${req.get('HOST')}${req.originalUrl}`);
      if (req.body)
        console.log('========Request body==========\n', req.body);
      if (req.params)
        console.log('========Request params==========\n', req.params);
      if (req.query)
        console.log('========Request query string==========\n', req.query);
      if (req.headers.authorization)
        console.log('====Auth token====\n', req.headers.authorization);

      next();
    });
    require('../script')
  }
};

export const adminPassport = async (req, res, next) => {
  try {
    // console.log('getereteet')
    // const accessToken = req.headers['x-access-token'];
    // let admin;
    // if (!accessToken) throw new Error("token missing!");

    // const details = await verifyToken(accessToken)
    // console.log('getereteet', details)

    // admin = await models.User.findOne({ _id: details.id, type: "ADMIN" })
    // if (!admin) {
    //   throw new Error("admin not authorised.");
    // }
    // if (!admin.verified) {
    //   throw new Error("admin not verified");
    // }
    next();
  } catch (error) {
    next(error);
  }
}
