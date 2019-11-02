const grpc = require('grpc');
const Server = require('./server');
Server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('server is running at http://127.0.0.1:50051')
Server.start();
