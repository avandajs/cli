import CommandLine from "../CommandLine";
import {camelCase,snakeCase} from "lodash";
const cliProgress = require("cli-progress");
import * as models from "../../../app/models/.boot"
import {error, success} from "../util";
import {Model} from "avanda-orm";
import connection from "avanda-core/database/connection";
import database from "../../../configs/database";
import {Command} from "commander";
import confirm from "../util/confirm";
import {Sequelize} from "sequelize";
// import {runtimeError} from "avanda-error";
// import {Model} from "avanda-orm";


export default class App implements CommandLine {
    command: string = "app <action>";
    description: string = "App migration command";
    connection?: Sequelize
    options = [
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
    ]
    userCommands: string = "../../../app/commands";
    defaultCommands: string = "./defaults";

    private capitalize(model: string| string[]): string {
        if (typeof model === "string") {
            model = model?.split('')
            model[0] = model[0].toUpperCase();//COn
            model = model.join('').replace(/[^\w]+/i,'')
            return model;
        }
        return model as unknown as string
    }


    private async install(tableName: string,force: boolean = false){

        // @ts-ignore
        let m = models[tableName];

        if (!m){
            error(`Error: "${m}" model does not exist`)
            return;
        }

        let model =  new m(this.connection) as Model;

        // @ts-ignore
        try {
            await model.init().sync({alter: true,logging: false,benchmark: true,force})
            success(`>> ✅ "${tableName}" synchronized `,false)
        }catch (e){
            error(`>> ❌ "${tableName}": ${e}`)

        }

    }

    private async uninstall(tableName: string){

        // @ts-ignore
        let m = models[tableName];

        if (!m){
            error(`Error: "${m}" model does not exist`)
            return;
        }

        let model =  new m(this.connection) as Model;

        // @ts-ignore
        try {
            await model.init().drop({logging: false,benchmark: true, cascade: true})
            success(`>> ✅ "${tableName}" dropped `,false)
        }catch (e){
            error(`>> ❌ "${tableName}": ${e}`)

        }

    }

    public async exe(action: string = '',options: object) {

        this.connection = await connection(database);


        // @ts-ignore
        let {t: tableName} = options
        // @ts-ignore
        let {y: yes} = options
        // @ts-ignore
        let {Force: force} = options

        if (force){
            await this.connection.query("SET FOREIGN_KEY_CHECKS = 0")
        }

        let acceptableCommands = ['install','uninstall']


        if (!acceptableCommands.includes(action)) {
            error(`invalid action: ${action}`);
            return;
        }
        if (!tableName){
            if (yes){
                success('⏩ Starting operation',false)
            }else if (!(await confirm('Are you sure you want to ' + action + ' all tables?'))) {
                success('Done!')
                return;
            }
            for(let table in models){
                table = this.capitalize(camelCase(table))
                // @ts-ignore
                await this[action](table,!!force)
            }
            console.log("----------------------")
            success(`>> ✅ All models synchronized`)
            process.exit(0)

            return;
        }

        tableName = this.capitalize(camelCase(tableName))

        // @ts-ignore
        await this[action](tableName,!!force)

        if (force){
            await this.connection.query("SET FOREIGN_KEY_CHECKS = 1")
        }
        process.exit(0)


    }

}