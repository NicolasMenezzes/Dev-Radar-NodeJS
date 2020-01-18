var socketio = require("socket.io")
var connections = [];
var parseStringasArray = require("./parseStringasArray")
var calculateDistance = require("./calculateDistance")
var io

exports.setupWebsocket = (server) => {
   var io = socketio(server)

   io.on("connection", socket => {

    var {latitude, longitude, techs} = socket.handshake.query
    
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringasArray(techs)
            
        })
    
    })

}

exports.findConnections = (coordinates, techs) =>{
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })
}
