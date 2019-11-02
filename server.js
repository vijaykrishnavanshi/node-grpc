const grpc = require('grpc');
const uuid = require('uuid/v1');
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

const server = new grpc.Server()
const todos = [];
server.addService(todoproto.TodoService.service, {
    list : (_,callback) =>{
        console.log(todos);
        callback(null, todos);
    },
    insert : (call,callback) => {
        let todo = call.request;
        todo.id = uuid()
        todos.push(todo)
        callback(null,todo)
    },
})

server.bind('127.0.0.1:50051',
grpc.ServerCredentials.createInsecure())
console.log('server is running at http://127.0.0.1:50051')
server.start()
