const { fetchNotifications, clearNotifications } = require('./socketService');

module.exports = (io) => {
    io.on('connection', async (socket) => {
        socket.on("error", (err) => {
            if (err && err.message === "unauthorized event") {
                socket.disconnect();
            }
        });
        console.log('new connection - ', socket.id)
        socket.on('fetchNotifications', (query) => fetchNotifications(socket, query));
        socket.on('clearNotifications', (query) => clearNotifications(socket, query));
        socket.on('disconnect', () => console.log('disconnected'));
    })
}