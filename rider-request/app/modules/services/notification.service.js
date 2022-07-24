import models from '../model'


const fetchNotifications = async (socket, query) => {
    let data;
    if (query.driverId) {
        data = models.Driver.findOne(query).lean().exec()
    }
    if (query.riderId) {
        data = models.Rider.findOne(query).lean().exec()
    }
    if (data.notifications) {
        socket.emit('fetchNotifications', data.notifications || [])
    }
}

const clearNotifications = async (socket, query) => {
    await notificationServices.deleteNotifications({ riderId: socket.user._id })
    await fetchNotifications(socket, query)
}

/** Get notifications */
const getNotifications = async (query) => {
    try {
        const notificationDetails = await models.Notifications.find(query).sort([['createdAt', 'DESC']]).lean().exec()
        return notificationDetails
    } catch (e) {
        throw new Error(e)
    }
}

/** Delete notifications */
const deleteNotifications = async (query) => {
    try {
        await models.Notifications.deleteMany(query, { new: true })
        return true
    } catch (e) {
        throw new Error(e)
    }
}

/** Create notifications */
const createNotification = async (body) => {
    try {
        await models.Notifications.create(body)
        return true
    } catch (e) {
        throw new Error(e)
    }
}

export default { getNotifications, deleteNotifications, createNotification, fetchNotifications, clearNotifications }