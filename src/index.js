const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 3030,
  host: 'localhost',
});

server.route(routes);

server.start();
console.log(`Server running at ${server.info.uri}`);
