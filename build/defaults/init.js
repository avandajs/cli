"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var index_1 = require("../index");
var downloader = require('github-download-directory');
var Init = /** @class */ (function () {
    function Init() {
        this.command = "init <projectName>";
        this.description = "create new project";
    }
    Init.prototype.exe = function (projectName, options) {
        if (projectName === void 0) { projectName = ''; }
        var exec = require('child_process').exec;
        index_1.Out.write("Started creating a project: " + chalk_1.default.green(projectName));
        exec("git clone https://github.com/avandajs/avanda-starter.git " + projectName, function (err, stdout, stderr) {
            // handle err, stdout & stderr
            if (err) {
                index_1.Out.error(stderr);
            }
            else {
                index_1.Out.success("\u2611\uFE0F Project created successfully", false);
                index_1.Out.write("\u2139\uFE0F Next steps: run the commands below");
                index_1.Out.write(chalk_1.default.green('[1]') + " cd " + projectName);
                index_1.Out.write(chalk_1.default.green('[2]') + " npm install");
                index_1.Out.write(chalk_1.default.green('[3]') + " npm run dev");
            }
        });
    };
    return Init;
}());
exports.default = Init;
