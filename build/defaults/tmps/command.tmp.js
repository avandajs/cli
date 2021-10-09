"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let command = function (assetName, meta) {
    var _a, _b;
    const { cmdName } = meta;
    const { cmdDescription } = meta;
    return `import { CommandLine } from "@avanda/cli";
import {Out} from "@avanda/cli";


export default class ${assetName} implements CommandLine {
    command: string = "${((_a = cmdName === null || cmdName === void 0 ? void 0 : cmdName.trim()) === null || _a === void 0 ? void 0 : _a.length) ? cmdName : assetName.toLowerCase()} <target>";
    description: string = "${((_b = cmdDescription === null || cmdDescription === void 0 ? void 0 : cmdDescription.trim()) === null || _b === void 0 ? void 0 : _b.length) ? cmdDescription : 'generate a bootstrapper'}";


    public exe(target: string = '',options: object) {
        Out.success('this is coming from ${assetName}')
    }

}`;
};
exports.default = command;
