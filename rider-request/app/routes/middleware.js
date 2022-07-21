'use strict';
import bodyParser from 'body-parser';
import cors from 'cors';
import { raw } from 'express';
const io = require('socket.io')();
const { fetchNotifications, clearNotifications } = require('./../modules/Socket/socketService');

const ClientManager = require('./../modules/chatAndCall/ClientManager')
const ChatroomManager = require('./../modules/chatAndCall/ChatroomManager')
const makeHandlers = require('./../modules/chatAndCall/handlers')

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

const customerIoAuth = (socket, next) => {
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
  io.on('connection', async (socket) => {
    socket.on("error", (err) => {
      if (err && err.message === "unauthorized event") {
        socket.disconnect();
      }
    });
    console.log('new connection - ', socket.id)
    socket.on('fetchNotifications', (query) => fetchNotifications(socket, query));
    socket.on('clearNotifications', (query) => clearNotifications(socket, query));
    socket.on('disconnect', () => console.log('disconnected'));
  })
  io.on('connection', function (client) {
    const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleGetChatrooms,
      handleGetAvailableUsers,
      handleDisconnect
    } = makeHandlers(client, clientManager, chatroomManager)

    console.log('client connected...', client.id)
    clientManager.addClient(client)

    client.on('register', handleRegister)

    client.on('join', handleJoin)

    client.on('leave', handleLeave)

    client.on('message', handleMessage)

    client.on('chatrooms', handleGetChatrooms)

    client.on('availableUsers', handleGetAvailableUsers)

    client.on('disconnect', function () {
      console.log('client disconnect...', client.id)
      handleDisconnect()
    })

    client.on('error', function (err) {
      console.log('received error from client:', client.id)
      console.log(err)
    })
  })



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
