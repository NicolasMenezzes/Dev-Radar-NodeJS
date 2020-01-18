var Dev = require("../models/dev")
var parseStringAsArray = require("../utils/parseStringasArray")

module.exports = {
    async index(request, response) {
       var {latitude, longitude, techs} = request.query
        
        var techsArray = parseStringAsArray(techs)

        var devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                $maxDistance: 10000,
                },

            },
        })
        
        return response.json (devs)
    }
}
