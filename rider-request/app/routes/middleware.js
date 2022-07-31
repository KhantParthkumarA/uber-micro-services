'use strict';
import bodyParser from 'body-parser';
import cors from 'cors';
import { raw } from 'express';
import firebaseAdmin from 'firebase-admin';
import models from '../modules/model'

const io = require('socket.io')();

const jwt = require('jsonwebtoken');
const verifyToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded
}

const fireStoreConfig = {
  'type': '',
  'project_id': '',
  'private_key_id': '',
  'private_key': '',
  'client_email': '',
  'client_id': '',
  'auth_uri': '',
  'token_uri': '',
  'auth_provider_x509_cert_url': '',
  'client_x509_cert_url': ''
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
  /**
   call this after add fireStoreConfig
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

const customerIoAuth = async (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.token) {
    console.log('Rider not authorized')
    return next(new Error('Rider not authorized'));
  }
  const details = await verifyToken(socket.handshake.query.token)
  const riderDetails = await models.Rider.findOne({ riderId: details.id }).lean().exec()
  if (!riderDetails) {
    console.log('Rider not authorized')
    return next(new Error('Rider not authorized'));
  }
  const notificationsDetails = await NotificationsModel.find({ riderId: riderDetails._id }).sort([['createdAt', 'DESC']]).lean().exec()
  riderDetails.notifications = notificationsDetails
  socket.user = riderDetails
  next();
}

export const riderPassport = async (req, res, next) => {
  try {
    // const accessToken = req.headers['x-access-token'];
    // let rider;
    // if (!accessToken) throw new Error("token missing!");

    // const details = await verifyToken(accessToken)
    // rider = await models.Rider.findOne({ _id: details.id, type: "RIDER" })
    // if (!rider) {
    //   throw new Error("rider not authorised.");
    // }
    // if (!rider.verified) {
    //   throw new Error("rider not verified");
    // }
    // req.user = rider
    next();
  } catch (error) {
    next(error);
  }
}
