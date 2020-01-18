var axios = require ('axios')
var Dev = require("../models/dev")
var parseStringAsArray = require("../utils/parseStringasArray")
var { findConnections, sendMessage } = require("../utils/websocket")


module.exports = {
    async index(request, response){
        var devs = await Dev.find()
    
    return response.json(devs)
    
    },
    async store (request, response) {
        var { github_user, techs, latitude, longitude} = request.body
        
        var dev = await Dev.findOne({ github_user })

        if(!dev){
            var Apiresponse = await axios.get(`https://api.github.com/users/${github_user}`)
    
        var {name = login, avatar_url, bio} = Apiresponse.data
    
        var techsArray = parseStringAsArray(techs)
        
        var location = {
            
            type: "Point",
            coordinates: [longitude, latitude],
        }
        

        var dev = await Dev.create({
            github_user,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })
        

        var sendSocketMessageTo = findConnections({
            latitude, longitude
        },
        techsArray
        )
        sendMessage(sendSocketMessageTo, "newDev", dev)

        }
        return response.json(dev)
    
    }
}
