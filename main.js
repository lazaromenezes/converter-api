var restify = require('restify')
var measureApi = require('./measures.js')

const PORT = process.env.PORT || 8080

var server = restify.createServer()
server.use(restify.plugins.queryParser())

measureApi.registerHandler(server)

server.listen(PORT, () => {console.log('%s listening at %s', server.name, server.url)})

