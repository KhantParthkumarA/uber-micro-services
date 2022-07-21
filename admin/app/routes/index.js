const { errorMessage } = require("iyasunday");
const product = require("../module/product");
const driver = require('./../module/driver');
const ride = require('./../module/ride');

module.exports = (app) => {
  const version = "/v1/admin";
  app.use(version, product);
  app.use(version, driver);
  app.use(version, ride);

  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.httpStatusCode || 500).json(errorMessage(err));
    }
    else {
      return next();
    }

  });

  app.use((req, res) => {
    res
      .status(404)
      .json({
        message: `Requested route ( ${req.get("HOST")}${req.originalUrl
          } ) not found`,
      });
  });
};
