"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const readline = __importStar(require("readline"));
const error_1 = __importDefault(require("./error"));
async function confirm(question, exit = true) {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question(chalk_1.default.yellow.yellow(question) + ' [y/n] ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                case 'yes':
                    resolve(true);
                    break;
                case 'n':
                case 'no':
                    resolve(false);
                    break;
                default:
                    (0, error_1.default)('Invalid response!');
                    confirm(question, exit);
                    console.log('Invalid answer!');
            }
            rl.close();
        });
    });
}
exports.default = confirm;
