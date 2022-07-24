import notificationServices from '../services/notification.service'

const notificationsControllerResponse = responseMessage.notificationsControllerResponse

/** create notification */
const createNotification = async (req, res, next) => {
    try {
        await notificationServices.createNotification(req.body)
        res.status(200).send({ message: notificationsControllerResponse.createNotificationSuccess })
        // if (req.body.title.includes('subscription') && !req.user?.notification?.subscriptions) return;
        /** Push notification */
        if (req.user.pushTokens.length) {
            const tokens = req.user.pushTokens.map(i => i.token)
            pushNotification(tokens, req.body.title, req.body.description)
        }
    } catch (e) {
        return next(e)
    }
}

/** create notification */
const deleteNotification = async (req, res, next) => {
    try {
        const query = req.query.id ? { _id: req.query.id, userId: req.user._id } : { userId: req.user._id }
        await notificationServices.deleteNotifications(query)
        res.status(200).send({ message: notificationsControllerResponse.deleteNotificationSuccess })
    } catch (e) {
        return next(e)
    }
}

export {
    createNotification,
    deleteNotification
}