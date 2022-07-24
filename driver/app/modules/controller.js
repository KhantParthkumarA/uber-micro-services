import * as service from './service';

export async function updateVehicleDetail(req, res, next) {
    try {
        return res.status(200).json(await service.updateVehicleDetail(req.params.driverId, req.params.productId, req.body))
    } catch (err) {
        next(err);
    }
}

export async function cancleRide(req, res, next) {
    try {
        return res.status(200).json(await service.cancleRide(req.params.driverId, req.params.orderId, req.body))
    } catch (err) {
        next(err);
    }
}

export async function updateStatus(req, res, next) {
    try {
        return res.status(200).json(await service.updateStatus(req.params.driverId, req.params.orderId, req.body))
    } catch (err) {
        next(err);
    }
}

export async function updateETA(req, res, next) {
    try {
        return res.status(200).json(await service.updateStatus(req.params.driverId, req.params.orderId, req.body))
    } catch (err) {
        next(err);
    }
}

export async function craeteOrderAndConfirmRide(req, res, next) {
    try {
        return res.status(200).json(await service.createOrder(req.body))
    } catch (err) {
        next(err);
    }
}

export async function upcomingTrip(req, res, next) {
    try {
        return res.status(200).json(await service.getUpcomingTrip(req.params.driverId))
    } catch (err) {
        next(err);
    }
}