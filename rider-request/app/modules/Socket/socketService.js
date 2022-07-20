const { getRiderAndNotifications, deleteNotifications } = require('./../rider/service')

const fetchNotifications = async (socket, query) => {
    getRiderAndNotifications(query).then(res => {
        socket.emit('fetchNotifications', res.notifications || [])
    })
}

const clearNotifications = async (socket, query) => {
    await deleteNotifications({ riderId: socket.user._id })
    await fetchNotifications(socket, query)
}

module.exports = { fetchNotifications, clearNotifications };