"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var lodash_1 = require("lodash");
var out_1 = require("../out");
var confirm_1 = __importDefault(require("../out/confirm"));
var Faker = __importStar(require("faker"));
var chalk_table_1 = __importDefault(require("chalk-table"));
var App = /** @class */ (function () {
    function App() {
        this.command = "app <action>";
        this.description = "App migration command";
        this.options = [
            {
                option: '-t <table-name>',
                description: 'Table to perform action on'
            },
            {
                option: '-y',
                description: 'Accept all prompts'
            },
            {
                option: '-force',
                description: 'Force operation (ignore reference constraint)'
            }
        ];
        this.userCommands = "../../../app/commands";
        this.defaultCommands = "./defaults";
    }
    App.prototype.capitalize = function (model) {
        if (typeof model === "string") {
            model = model === null || model === void 0 ? void 0 : model.split('');
            model[0] = model[0].toUpperCase(); //COn
            model = model.join('').replace(/[^\w]+/i, '');
            return model;
        }
        return model;
    };
    App.prototype.seed = function (tableName, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var seeder, seederInstance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seeder = this.seeders[tableName];
                        if (!seeder) {
                            (0, out_1.error)("Error: \"" + tableName + "\" model does not exist");
                            return [2 /*return*/];
                        }
                        seederInstance = new seeder();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, seederInstance.run(Faker)];
                    case 2:
                        _a.sent();
                        (0, out_1.success)(">> \u2705 \"" + tableName + "\" populated ", false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        (0, out_1.error)(">> \u274C \"" + tableName + "\": " + e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.install = function (tableName, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var m, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        m = this.models[tableName];
                        if (!m) {
                            (0, out_1.error)("Error: \"" + m + "\" model does not exist");
                            return [2 /*return*/];
                        }
                        model = new m(this.connection);
                        return [4 /*yield*/, model.init()];
                    case 1: 
                    // try {
                    return [4 /*yield*/, (_a.sent()).sync({ alter: true, logging: false, benchmark: true, force: force })];
                    case 2:
                        // try {
                        _a.sent();
                        (0, out_1.success)(">> \u2705 \"" + tableName + "\" synchronized ", false);
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.describe = function (tableName, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var m, model, struct, fields, _i, _a, col;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        m = this.models[tableName];
                        if (!m) {
                            (0, out_1.error)("Error: \"" + m + "\" model does not exist");
                            return [2 /*return*/];
                        }
                        model = new m(this.connection);
                        return [4 /*yield*/, model.init()];
                    case 1: return [4 /*yield*/, (_b.sent()).describe()];
                    case 2:
                        struct = _b.sent();
                        fields = [];
                        for (_i = 0, _a = Object.keys(struct); _i < _a.length; _i++) {
                            col = _a[_i];
                            fields.push(__assign({ column: col }, struct[col]));
                        }
                        console.log((0, chalk_table_1.default)({}, fields));
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.uninstall = function (tableName, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var m, model, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        m = this.models[tableName];
                        if (!m) {
                            (0, out_1.error)("Error: \"" + m + "\" model does not exist");
                            return [2 /*return*/];
                        }
                        model = new m(this.connection);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, model.init()];
                    case 2: return [4 /*yield*/, (_a.sent()).drop({ logging: false, benchmark: true, cascade: true })];
                    case 3:
                        _a.sent();
                        (0, out_1.success)(">> \u2705 \"" + tableName + "\" dropped ", false);
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        (0, out_1.error)(">> \u274C \"" + tableName + "\": " + e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.exe = function (action, options) {
        if (action === void 0) { action = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var tableName, yes, force, acceptableCommands, targetAliases, targetList, _a, _b, _i, table;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.connection)
                            throw new Error('Connection not found');
                        tableName = options.t;
                        yes = options.y;
                        force = options.Force;
                        if (!force) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connection.query("SET FOREIGN_KEY_CHECKS = 0", null)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        acceptableCommands = ['install', 'uninstall', 'seed', 'describe'];
                        if (!acceptableCommands.includes(action)) {
                            (0, out_1.error)("invalid action: " + action);
                            return [2 /*return*/];
                        }
                        if (!!tableName) return [3 /*break*/, 10];
                        if (!yes) return [3 /*break*/, 3];
                        (0, out_1.success)('⏩ Starting operation', false);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, (0, confirm_1.default)('Are you sure you want to ' + action + ' all tables?')];
                    case 4:
                        if (!(_c.sent())) {
                            (0, out_1.success)('Done!');
                            return [2 /*return*/];
                        }
                        _c.label = 5;
                    case 5:
                        targetAliases = {
                            seed: 'seeders',
                            install: 'models',
                            uninstall: 'models',
                            describe: 'models',
                        };
                        targetList = this[targetAliases[action]];
                        _a = [];
                        for (_b in targetList)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        table = _a[_i];
                        table = this.capitalize((0, lodash_1.camelCase)(table));
                        return [4 /*yield*/, this[action](table, !!force)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        console.log("----------------------");
                        (0, out_1.success)(">> \u2705 All models synchronized");
                        process.exit(0);
                        return [2 /*return*/];
                    case 10:
                        tableName = this.capitalize((0, lodash_1.camelCase)(tableName));
                        return [4 /*yield*/, this[action](tableName, !!force)];
                    case 11:
                        _c.sent();
                        if (!force) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.connection.query("SET FOREIGN_KEY_CHECKS = 1")];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13:
                        process.exit(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.default = App;
