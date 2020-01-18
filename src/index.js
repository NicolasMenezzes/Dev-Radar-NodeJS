var express = require("express"); 
var mongoose = require("mongoose")
var cors = require("cors")
var http = require("http")
var routes = require("./routes")
var {setupWebsocket} = require("./utils/websocket")

var app = express()
var server = http.Server(app)

setupWebsocket(server)

mongoose.connect("mongodb+srv://nicolas:nicolas2610@cluster0-3xbpu.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
app.use(cors())
app.use(express.json())
app.use(routes)
server.listen(7777)
