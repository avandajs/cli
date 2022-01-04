"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
function default_1(text) {
    console.log(chalk_1.default.red.red(text));
    process.exit(0);
}
exports.default = default_1;
