"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var port = process.env.PORT || 3000;
var server = http_1.default.createServer(function (req, res) {
    console.log('heh');
});
server.listen(port, function () { return console.log("Server runs on ".concat(port, " port.")); });
