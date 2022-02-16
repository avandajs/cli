"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command = function (assetName, meta) {
    var _a, _b;
    var cmdName = meta.cmdName;
    var cmdDescription = meta.cmdDescription;
    return "import { CommandLine } from \"@avanda/cli\";\nimport {Out} from \"@avanda/cli\";\n\n\nexport default class ".concat(assetName, " implements CommandLine {\n    command: string = \"").concat(((_a = cmdName === null || cmdName === void 0 ? void 0 : cmdName.trim()) === null || _a === void 0 ? void 0 : _a.length) ? cmdName : assetName.toLowerCase(), " <target>\";\n    description: string = \"").concat(((_b = cmdDescription === null || cmdDescription === void 0 ? void 0 : cmdDescription.trim()) === null || _b === void 0 ? void 0 : _b.length) ? cmdDescription : 'generate a bootstrapper', "\";\n\n\n    public exe(target: string = '',options: object) {\n        Out.success('this is coming from ").concat(assetName, "')\n    }\n\n}");
};
exports.default = command;
