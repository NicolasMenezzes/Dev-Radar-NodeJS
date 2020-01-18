var mongoose = require("mongoose")
var PointSchema = require("./utils/pointschema")

var DevSchema = new mongoose.Schema({
    name: String,
    github_user: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: "2dsphere"
    }


    

})

module.exports = mongoose.model("Dev", DevSchema)