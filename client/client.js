const grpc = require('grpc');

const PROTO_PATH = './proto/todo.proto';

const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    },
);

const todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;

const client = new todoproto.TodoService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;