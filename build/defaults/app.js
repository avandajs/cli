"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const out_1 = require("../out");
const confirm_1 = __importDefault(require("../out/confirm"));
class App {
    constructor() {
        this.command = "app <action>";
        this.description = "App migration command";
        this.options = [
            {
                option: '-t <table-name>',
                description: 'Table to install'
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
    capitalize(model) {
        if (typeof model === "string") {
            model = model === null || model === void 0 ? void 0 : model.split('');
            model[0] = model[0].toUpperCase(); //COn
            model = model.join('').replace(/[^\w]+/i, '');
            return model;
        }
        return model;
    }
    async install(tableName, force = false) {
        let m = this.models[tableName];
        if (!m) {
            (0, out_1.error)(`Error: "${m}" model does not exist`);
            return;
        }
        let model = new m(this.connection);
        try {
            await model.init().sync({ alter: true, logging: false, benchmark: true, force });
            (0, out_1.success)(`>> ✅ "${tableName}" synchronized `, false);
        }
        catch (e) {
            (0, out_1.error)(`>> ❌ "${tableName}": ${e}`);
        }
    }
    async uninstall(tableName) {
        let m = this.models[tableName];
        if (!m) {
            (0, out_1.error)(`Error: "${m}" model does not exist`);
            return;
        }
        let model = new m(this.connection);
        try {
            await model.init().drop({ logging: false, benchmark: true, cascade: true });
            (0, out_1.success)(`>> ✅ "${tableName}" dropped `, false);
        }
        catch (e) {
            (0, out_1.error)(`>> ❌ "${tableName}": ${e}`);
        }
    }
    async exe(action = '', options) {
        if (!this.connection)
            throw new Error('Connection not found');
        let { t: tableName } = options;
        let { y: yes } = options;
        let { Force: force } = options;
        if (force) {
            await this.connection.query("SET FOREIGN_KEY_CHECKS = 0");
        }
        let acceptableCommands = ['install', 'uninstall'];
        if (!acceptableCommands.includes(action)) {
            (0, out_1.error)(`invalid action: ${action}`);
            return;
        }
        if (!tableName) {
            if (yes) {
                (0, out_1.success)('⏩ Starting operation', false);
            }
            else if (!(await (0, confirm_1.default)('Are you sure you want to ' + action + ' all tables?'))) {
                (0, out_1.success)('Done!');
                return;
            }
            for (let table in this.models) {
                table = this.capitalize((0, lodash_1.camelCase)(table));
                await this[action](table, !!force);
            }
            console.log("----------------------");
            (0, out_1.success)(`>> ✅ All models synchronized`);
            process.exit(0);
            return;
        }
        tableName = this.capitalize((0, lodash_1.camelCase)(tableName));
        await this[action](tableName, !!force);
        if (force) {
            await this.connection.query("SET FOREIGN_KEY_CHECKS = 1");
        }
        process.exit(0);
    }
}
exports.default = App;
