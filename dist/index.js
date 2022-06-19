"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var users_1 = require("./controllers/users");
var port = process.env.PORT || 3000;
var server = http_1.default.createServer(function (req, res) {
    if (req.url === '/users' && req.method === 'GET') {
        (0, users_1.sendUsers)(res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});
server.listen(port, function () { return console.log("Server runs on ".concat(port, " port.")); });
