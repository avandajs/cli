"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var out_1 = require("../out");
var Boostrap = /** @class */ (function () {
    function Boostrap() {
        this.command = "bootstrap <target>";
        this.description = "generate a bootstrapper";
        this.userCommands = "../../../app/commands";
        this.defaultCommands = "./defaults";
    }
    Boostrap.capitalize = function (file) {
        if (typeof file === "string") {
            file = file === null || file === void 0 ? void 0 : file.split('');
            file[0] = file[0].toUpperCase(); //COn
            file = file.join('').replace(/[^\w]+/i, '');
            return file;
        }
        return null;
    };
    Boostrap.prototype.exe = function (target, options) {
        if (target === void 0) { target = ''; }
        var code = "";
        var imports = "";
        var exports = "export default{";
        var files = fs_1.default.readdirSync(target, { withFileTypes: true });
        for (var index = 0; index < files.length; index++) {
            var file = void 0;
            file = files[index];
            if (!file.isFile())
                continue;
            file = path_1.default.parse(file.name);
            if (!(file.ext == 'ts' || file.ext == 'js') && file.name === '.boot') //skip the main boot file
                continue;
            var cappedFile = Boostrap.capitalize(file.name);
            imports += "import ".concat(cappedFile, " from \"./").concat(file.name, "\"; \n");
            exports += "\n\t".concat(cappedFile, ",");
        }
        exports += '\n}';
        code = "".concat(imports).concat(exports);
        fs_1.default.writeFileSync("".concat(target, "/.boot.ts"), code);
        // Write
        (0, out_1.success)(">> .boot file generted in: ".concat(target));
        // console.log(code)
    };
    return Boostrap;
}());
exports.default = Boostrap;
