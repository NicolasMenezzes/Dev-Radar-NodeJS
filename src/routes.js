var {Router} = require("express")
var Devcontroller = require("./controllers/DevController")
var SearchController = require("./controllers/SearchController")
var routes = Router()


routes.get("/devs", Devcontroller.index)
routes.post("/devs", Devcontroller.store)

routes.get ("/search", SearchController.index)
module.exports = routes;