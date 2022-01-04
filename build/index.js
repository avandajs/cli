#! /usr/bin/env ts-node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Out = void 0;
var commander_1 = require("commander");
var defaultCommands = __importStar(require("./defaults/.boot"));
var Out = __importStar(require("./out"));
exports.Out = Out;
function Avanda(commands, models, seeders, connection) {
    var allCommands = __assign(__assign({}, defaultCommands), commands);
    var _loop_1 = function (c) {
        var command = new allCommands[c]();
        command.connection = connection;
        command.models = models;
        command.seeders = seeders;
        commander_1.program
            .command(command.command)
            .description(command.description)
            .action(function (arg) {
            command.exe(arg, commander_1.program.opts());
        });
        if (command === null || command === void 0 ? void 0 : command.options) { //if command has options, populate options
            command.options.forEach(function (option) {
                commander_1.program.option(option.option, option.description);
            });
        }
    };
    for (var c in allCommands) {
        _loop_1(c);
    }
    commander_1.program.parse();
    //
}
exports.default = Avanda;
