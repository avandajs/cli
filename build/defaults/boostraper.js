"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const out_1 = require("../out");
class Boostrap {
    constructor() {
        this.command = "bootstrap <target>";
        this.description = "generate a bootstrapper";
        this.userCommands = "../../../app/commands";
        this.defaultCommands = "./defaults";
    }
    capitalize(file) {
        if (typeof file === "string") {
            file = file === null || file === void 0 ? void 0 : file.split('');
            file[0] = file[0].toUpperCase(); //COn
            file = file.join('').replace(/[^\w]+/i, '');
            return file;
        }
        return null;
    }
    exe(target = '', options) {
        let code = ``;
        let imports = ``;
        let exports = `export default{`;
        let files = fs_1.default.readdirSync(target, { withFileTypes: true });
        for (let index = 0; index < files.length; index++) {
            let file;
            file = files[index];
            if (!file.isFile())
                continue;
            file = path_1.default.parse(file.name);
            if (!(file.ext == 'ts' || file.ext == 'js') && file.name === '.boot') //skip the main boot file
                continue;
            let cappedFile = this.capitalize(file.name);
            imports += `import ${cappedFile} from "./${file.name}"; \n`;
            exports += `\n\t${cappedFile},`;
        }
        exports += '\n}';
        code = `${imports}${exports}`;
        fs_1.default.writeFileSync(`${target}/.boot.ts`, code);
        // Write
        (0, out_1.success)(`>> .boot file generted in: ${target}`);
        // console.log(code)
    }
}
exports.default = Boostrap;
