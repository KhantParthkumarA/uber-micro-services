'use strict';
import bodyParser from 'body-parser';
import cors from 'cors';
import { raw } from 'express';
import firebaseAdmin from 'firebase-admin';
import models from '../modules/model'

const io = require('socket.io')();

const fireStoreConfig = {}

export default app => {
  if (process.env.NODE_ENV === 'production') {
   console.log("Production");
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(raw());
  io.use(customerIoAuth)
  /**
   call after add fireStoreConfig
   firebaseAdmin.initializeApp({
     credential: firebaseAdmin.credential.cert(fireStoreConfig),
    });
  */
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
  }
};

const customerIoAuth = (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.token) {
    console.log('Driver not authorized')
    return next(new Error('Driver not authorized'));
  }
  const details = await verifyToken(socket.handshake.query.token)
  const driverDetails = await models.Driver.findOne({ driverId: details.id }).lean().exec()
  if (!driverDetails) {
    console.log('Driver not authorized')
    return next(new Error('Driver not authorized'));
  }
  const notificationsDetails = await models.Notifications.find({ driverId: driverDetails._id }).sort([['createdAt', 'DESC']]).lean().exec()
  driverDetails.notifications = notificationsDetails
  socket.user = driverDetails
  next();
}

export const driverPassport = async (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token'];
    let driver;
    if (!accessToken) throw new Error("token missing!");

    const details = await verifyToken(accessToken)
    driver = await models.Driver.findOne({ _id: details.id })
    if (!driver) {
      throw new Error("driver not authorised.");
    }
    if (!driver.verified) {
      throw new Error("driver not verified");
    }
    req.user = driver
    next();
  } catch (error) {
    next(error);
  }
}
