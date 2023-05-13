const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes.routing);

server.listen(3000);