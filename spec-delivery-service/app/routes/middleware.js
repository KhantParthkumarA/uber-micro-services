'use strict';
import bodyParser from 'body-parser';
import cors from 'cors';
import { raw } from 'express';

export default app => {
  if (process.env.NODE_ENV === 'production') {
   console.log("Production");
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(raw());

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
