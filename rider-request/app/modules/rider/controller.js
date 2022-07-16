import * as service from './service';
const { makeCall } = require('./../utils/makeCall');

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

export async function makeCall(req, res, next) {
    try {
        return res.status(200).json(await makeCall(req.body.phoneNo));
    } catch (err) {
        next(err);
    }
}