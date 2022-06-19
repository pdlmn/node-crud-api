"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var users_1 = require("./controllers/users");
var port = process.env.PORT || 3000;
var server = http_1.default.createServer(function (req, res) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (req.url === '/users' && req.method === 'GET') {
        (0, users_1.sendUsers)(res);
    }
    else if (req.url === '/users' && req.method === 'POST') {
        (0, users_1.createUser)(req, res);
    }
    else if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/users\/([0-9]+)/)) && req.method === 'GET') {
        var id = +((_b = req.url) === null || _b === void 0 ? void 0 : _b.split('/')[2]);
        (0, users_1.sendUser)(res, id);
    }
    else if (((_c = req.url) === null || _c === void 0 ? void 0 : _c.match(/\/users\/([0-9]+)/)) && req.method === 'PUT') {
        var id = +((_d = req.url) === null || _d === void 0 ? void 0 : _d.split('/')[2]);
        (0, users_1.updateUser)(req, res, id);
    }
    else if (((_e = req.url) === null || _e === void 0 ? void 0 : _e.match(/\/users\/([0-9]+)/)) && req.method === 'DELETE') {
        var id = +((_f = req.url) === null || _f === void 0 ? void 0 : _f.split('/')[2]);
        (0, users_1.removeUser)(res, id);
    }
    else if (req.url.startsWith('/users/')) {
        var id = (_g = req.url) === null || _g === void 0 ? void 0 : _g.split('/')[2];
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "".concat(id, " is not a valid id") }, null, 2) + '\n');
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }, null, 2) + '\n');
    }
});
server.listen(port, function () { return console.log("Server runs on ".concat(port, " port.")); });
