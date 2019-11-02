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
const { TodoService } = grpc.loadPackageDefinition(packageDefinition).todoproto;

const todos = [];

const serviceMap = {
    list: (_,callback) =>{
        console.log(todos);
        callback(null, todos);
    },
    insert: (call,callback) => {
        let todo = call.request;
        todo.id = uuid()
        todos.push(todo)
        callback(null,todo)
    }
};

class Server {
    constructor(service, serviceMap) {
        this.server = new grpc.Server();
        this.server.addService(service, serviceMap);
    }
    get() {
        return this.server;
    }
}

module.exports = new Server(TodoService.service, serviceMap).get();
