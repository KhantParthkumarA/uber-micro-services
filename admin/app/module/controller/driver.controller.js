import * as service from "../services/driver.service";

export async function createDriver(req, res, next) {
    try {
        res.status(200).json(await service.createDriver(req.body));
    } catch (err) {
        next(err);
    }
}

export async function getAllDriver(req, res, next) {
    try {
        res.status(200).json(await service.getAllDriver());
    } catch (err) {
        next(err);
    }
}

export async function getDriver(req, res, next) {
    try {
        res.status(200).json(await service.getDriver(req.params.id));
    } catch (err) {
        next(err);
    }
}

export async function deleteDriver(req, res, next) {
    try {
        res.status(200).json(await service.deleteDriver(req.params.id));
    } catch (err) {
        next(err);
    }
}
export async function updateDriver(req, res, next) {
    try {
        res.status(200).json(await service.updateDriver(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
}

export async function driverLiveLocation(req, res, next) {
    try {
        res.status(200).json(await service.getDriverLiveLocation(req.query));
    } catch (err) {
        next(err);
    }
}

export async function unapproveDriver(req, res, next) {
    try {
        res.status(200).json(await service.getUnapproveDriver());
    } catch (err) {
        next(err);
    }
}


export async function approveDriver(req, res, next) {
    try {
        res.status(200).json(await service.getApproveDriver());
    } catch (err) {
        next(err);
    }
}

export async function driverEarning(req, res, next) {
    try {
        res.status(200).json(await service.getDriverEarning(req.params.id));
    } catch (err) {
        next(err);
    }
}

export async function driverDetailWithRideHistory(req, res, next) {
    try {
        res.status(200).json(await service.getDriverDetailWithRideHistory());
    } catch (err) {
        next(err);
    }
}