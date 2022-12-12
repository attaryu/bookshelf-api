const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Content-Type', 'Accept'],
    },
  },
});

server.route(routes);

server.start();
console.log(`Server running at ${server.info.uri}`);
