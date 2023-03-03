"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var boostraper_1 = __importDefault(require("./boostraper"));
var lodash_1 = require("lodash");
var out_1 = require("../out");
var getInput_1 = __importDefault(require("../out/getInput"));
var command_tmp_1 = __importDefault(require("./tmps/command.tmp"));
var model_tmp_1 = __importDefault(require("./tmps/model.tmp"));
var seeder_tmp_1 = __importDefault(require("./tmps/seeder.tmp"));
var middleware_tmp_1 = __importDefault(require("./tmps/middleware.tmp"));
var event_tmp_1 = __importDefault(require("./tmps/event.tmp"));
var controller_1 = __importDefault(require("./tmps/controller"));
var Create = /** @class */ (function () {
    function Create() {
        this.command = "create <asset>";
        this.description = "This command automatically generates assets for you";
        this.options = [
            {
                option: '-n <name>',
                description: 'Asset name'
            },
            {
                option: '-a',
                description: 'Create all necessary assets at once'
            },
        ];
        this.writePaths = {
            command: "./app/commands",
            controller: "./app/controllers",
            middleware: "./app/middlewares",
            model: "./app/models",
            seeder: "./app/seeders",
            event: "./app/events",
        };
    }
    Create.prototype.modelCreate = function (assetName, exitOnDone) {
        if (exitOnDone === void 0) { exitOnDone = true; }
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = (0, model_tmp_1.default)(assetName, {});
                        return [4 /*yield*/, Create.writeCode(template, this.writePaths.model + '/' + assetName + '.ts')];
                    case 1:
                        _a.sent();
                        (0, out_1.success)('Model code successfully generated', false);
                        return [4 /*yield*/, (new boostraper_1.default()).exe(this.writePaths.model, {}, exitOnDone)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Create.prototype.seederCreate = function (assetName, exitOnDone) {
        if (exitOnDone === void 0) { exitOnDone = true; }
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = (0, seeder_tmp_1.default)(assetName, {});
                        return [4 /*yield*/, Create.writeCode(template, this.writePaths.seeder + '/' + assetName + '.ts')];
                    case 1:
                        _a.sent();
                        (0, out_1.success)('seeder code successfully generated', false);
                        return [4 /*yield*/, (new boostraper_1.default()).exe(this.writePaths.seeder, {}, exitOnDone)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Create.prototype.eventCreate = function (assetName, exitOnDone) {
        if (exitOnDone === void 0) { exitOnDone = true; }
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = (0, event_tmp_1.default)(assetName, {});
                        return [4 /*yield*/, Create.writeCode(template, this.writePaths.event + '/' + assetName + '.ts')];
                    case 1:
                        _a.sent();
                        (0, out_1.success)('event code successfully generated', false);
                        return [4 /*yield*/, (new boostraper_1.default()).exe(this.writePaths.seeder, {}, exitOnDone)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Create.prototype.middlewareCreate = function (assetName) {
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = (0, middleware_tmp_1.default)(assetName, {});
                        return [4 /*yield*/, Create.writeCode(template, this.writePaths.middleware + '/' + assetName + '.ts')];
                    case 1:
                        _a.sent();
                        (0, out_1.success)('Model code successfully generated', false);
                        return [4 /*yield*/, (new boostraper_1.default()).exe(this.writePaths.middleware, {})];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Create.prototype.controllerCreate = function (assetName, autoLinkModel) {
        if (autoLinkModel === void 0) { autoLinkModel = false; }
        return __awaiter(this, void 0, void 0, function () {
            var meta, _a, _b, _c, _d, template;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        meta = {};
                        // get command name
                        _a = meta;
                        if (!autoLinkModel) return [3 /*break*/, 1];
                        _b = assetName;
                        return [3 /*break*/, 3];
                    case 1:
                        _d = (_c = Create).toUpper;
                        return [4 /*yield*/, (0, getInput_1.default)('Enter an existing model name')];
                    case 2:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 3;
                    case 3:
                        // get command name
                        _a.modelName = _b;
                        if (!autoLinkModel && meta.modelName.trim().length && !fs_1.default.existsSync(this.writePaths.model + '/' + meta.modelName + '.ts')) {
                            (0, out_1.error)('Model with name: "' + meta.modelName + '" does not exist');
                            return [2 /*return*/];
                        }
                        template = (0, controller_1.default)(assetName, meta);
                        return [4 /*yield*/, Create.writeCode(template, this.writePaths.controller + '/' + assetName + '.ts')];
                    case 4:
                        _e.sent();
                        (0, out_1.success)('Controller code successfully generated', false);
                        return [4 /*yield*/, (new boostraper_1.default()).exe(this.writePaths.controller, {}, !autoLinkModel)];
                    case 5:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Create.prototype.commandCreate = function (assetName) {
        return __awaiter(this, void 0, void 0, function () {
            var meta, _a, _b, template;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        meta = {};
                        // get command name
                        _a = meta;
                        return [4 /*yield*/, (0, getInput_1.default)('Enter command name (Leave empty to use file name)')];
                    case 1:
                        // get command name
                        _a.cmdName = (_c.sent());
                        _b = meta;
                        return [4 /*yield*/, (0, getInput_1.default)('Enter command description')];
                    case 2:
                        _b.cmdDescription = (_c.sent());
                        template = (0, command_tmp_1.default)(assetName, meta);
                        return [4 /*yield*/, Create.writeCode(template, this.writePaths.command + '/' + assetName + '.ts')];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, (new boostraper_1.default()).exe(this.writePaths.command, {})];
                    case 4:
                        _c.sent();
                        (0, out_1.success)('Command code successfully generated');
                        return [2 /*return*/];
                }
            });
        });
    };
    Create.writeCode = function (code, target) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            fs_1.default.writeFile(target, code, function () {
                                resolve(null);
                            });
                        }
                        catch (e) {
                            (0, out_1.error)(e);
                        }
                    })];
            });
        });
    };
    Create.toUpper = function (text) {
        if (!text.trim().length)
            return "";
        var text_s = text.split('');
        text_s[0] = text_s[0].toUpperCase();
        return text_s.join('');
    };
    Create.prototype.exe = function (asset, options) {
        var _a;
        if (asset === void 0) { asset = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var assetName, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_a = options === null || options === void 0 ? void 0 : options.n) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, (0, getInput_1.default)('Enter ' + asset + ' name:')];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        assetName = _b;
                        if (!assetName) {
                            (0, out_1.error)('Error: specify the asset name, try again');
                            return [2 /*return*/];
                        }
                        assetName = Create.toUpper((0, lodash_1.camelCase)(assetName));
                        if (!options['a']) return [3 /*break*/, 7];
                        //    create all assets
                        //    create model
                        return [4 /*yield*/, this.modelCreate(assetName, false)];
                    case 4:
                        //    create all assets
                        //    create model
                        _c.sent();
                        return [4 /*yield*/, this.controllerCreate(assetName, true)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.seederCreate(assetName, false)];
                    case 6:
                        _c.sent();
                        (0, out_1.success)("All necessary assets generated");
                        return [2 /*return*/];
                    case 7:
                        if (this[asset + 'Create']) {
                            this[asset + 'Create'](assetName);
                        }
                        else {
                            (0, out_1.error)('unsupported asset type: ' + asset);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Create;
}());
exports.default = Create;
