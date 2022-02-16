"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text, exit) {
    if (exit === void 0) { exit = false; }
    console.log('\n' + text);
    if (exit)
        process.exit(0);
}
exports.default = default_1;
