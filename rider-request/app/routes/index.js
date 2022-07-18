import { errorMessage } from "iyasunday";
// import Insurance from "../modules/insurancePackage";
import Rider from "../modules/rider";
export default (app) => {
  const version = "/v1";
  app.use(version, Rider);


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
