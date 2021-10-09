"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function default_1(text, exit = true) {
    console.log('\n' + chalk_1.default.green.green(text));
    if (exit)
        process.exit(0);
}
exports.default = default_1;
