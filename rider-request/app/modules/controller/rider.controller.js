import * as service from '../services/rider.service';
import notificationService from '../services/notification.service'
const { makeCall } = require('../utils');
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

export async function create(req, res, next) {
    try {
        return res.status(200).json(await service.create(req.body))
    } catch (err) {
        next(err);
    }
}

export async function getPriceEstimate(req, res, next) {
    try {
        return res.status(200).json(await service.priceEstimate(req.query))
    } catch (err) {
        next(err);
    }
}

export async function getTimeEstimate(req, res, next) {
    try {
        return res.status(200).json(await service.timeEstimate(req.query))
    } catch (err) {
        next(err);
    }
}

export async function rideRequestEstimate(req, res, next) {
    try {
        return res.status(200).json(await service.rideRequestEstimate(req.body))
    } catch (err) {
        next(err);
    }
}

export async function rideRequest(req, res, next) {
    try {
        return res.status(200).json(await service.rideRequest(req.body))
    } catch (err) {
        next(err);
    }
}

export async function getCurrentRequest(req, res, next) {
    try {
        return res.status(200).json(await service.getCurrentRequest(req.query))
    } catch (err) {
        next(err);
    }
}

export async function updateCurrentRequest(req, res, next) {
    try {
        return res.status(200).json(await service.updateCurrentRequest(req.query.request_id, req.body));
    } catch (err) {
        next(err);
    }
}

export async function deleteCurrentRequest(req, res, next) {
    try {
        return res.status(200).json(await service.deleteCurrentRequest(req.query.request_id));
    } catch (err) {
        next(err);
    }
}

export async function getRequest(req, res, next) {
    try {
        return res.status(200).json(await service.getRequest(req.params))
    } catch (err) {
        next(err);
    }
}

export async function updateRequest(req, res, next) {
    try {
        return res.status(200).json(await service.updateRequest(req.params.request_id, req.body));
    } catch (err) {
        next(err);
    }
}

export async function deleteRequest(req, res, next) {
    try {
        return res.status(200).json(await service.deleteRequest(req.params.request_id));
    } catch (err) {
        next(err);
    }
}


export async function getReceipt(req, res, next) {
    try {
        return res.status(200).json(await service.getReceipt(req.params.request_id));
    } catch (err) {
        next(err);
    }
}

export async function makeCalls(req, res, next) {
    try {
        return res.status(200).json(await makeCall(req.body.phoneNo));
    } catch (err) {
        next(err);
    }
}

export async function heatmapData(req, res, next) {
    try {
        return res.status(200).json(await service.getHeatMapData());
    } catch (err) {
        next(err);
    }
}

export async function addfavDriver(req, res, next) {
    try {
        return res.status(200).json(await service.pushFavDriver(req.params.rider_id, req.body.driver_id));
    } catch (err) {
        next(err);
    }
}

export async function updateWaitingCharges(req, res, next) {
    try {
        return res.status(200).json(await service.updateWaitingCharge(req.params.rider_id, req.body.minute));
    } catch (err) {
        next(err);
    }
}

export async function createOrder(req, res, next) {
    try {
        return res.status(200).json(await service.createOrder(req.body));
    } catch (err) {
        next(err);
    }
}

export async function getOrder(req, res, next) {
    try {
        return res.status(200).json(await service.getOrder(req.params.id));
    } catch (err) {
        next(err);
    }
}

export async function getAllOrder(req, res, next) {
    try {
        return res.status(200).json(await service.getAllOrder());
    } catch (err) {
        next(err);
    }
}

export async function updateOrder(req, res, next) {
    try {
        return res.status(200).json(await service.updateOrder(req.body, req.params.id));
    } catch (err) {
        next(err);
    }
}

export async function cancleRide(req, res, next) {
    try {
        return res.status(200).json(await service.cancleRide(req.params.riderId, req.params.orderId, req.body));
    } catch (err) {
        next(err);
    }
}


export async function rideEta(req, res, next) {
    try {
        return res.status(200).json(await service.getEta(req.body));
    } catch (err) {
        next(err);
    }
}

export async function rateDriver(req, res, next) {
    try {
        return res.status(200).json(await service.rateDriver(req.params.riderId, req.body));
    } catch (err) {
        next(err);
    }
}


export async function rideDetails(req, res, next) {
    try {
        return res.status(200).json(await service.rideDetails(req.params.orderId));
    } catch (err) {
        next(err);
    }
}

export async function fareCalculation(req, res, next) {
    try {
        return res.status(200).json(await service.fareCalculation(req.params.productId, req.body));
    } catch (err) {
        next(err);
    }
}

export async function saveRiderLocation(req, res, next) {
    try {
        return res.status(200).json(await service.saveRiderLocation(req.params.riderId, req.body));
    } catch (err) {
        next(err);
    }
}


export async function pickupNotification(req, res, next) {
    try {
        return res.status(200).json(await service.pickUpNotification(req.params.riderId, req.params.driverId));
    } catch (err) {
        next(err);
    }
}

