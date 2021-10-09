import CommandLine from "../CommandLine";
import {camelCase,snakeCase} from "lodash";
import {error, success} from "../out";
import { Model } from "@avanda/orm";
import confirm from "../out/confirm";
import {Sequelize} from "sequelize";



export default class App implements CommandLine {
    command: string = "app <action>";
    description: string = "App migration command";
    connection?: Sequelize
    models: {[k: string]: new (connection: Sequelize) => Model}
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

        let m = this.models[tableName];

        if (!m){
            error(`Error: "${m}" model does not exist`)
            return;
        }

        let model =  new m(this.connection) as Model;

        try {
            await model.init().sync({alter: true,logging: false,benchmark: true,force})
            success(`>> ✅ "${tableName}" synchronized `,false)
        }catch (e){
            error(`>> ❌ "${tableName}": ${e}`)

        }

    }

    private async uninstall(tableName: string){

        let m = this.models[tableName];

        if (!m){
            error(`Error: "${m}" model does not exist`)
            return;
        }

        let model =  new m(this.connection) as Model;

        try {
            await model.init().drop({logging: false,benchmark: true, cascade: true})
            success(`>> ✅ "${tableName}" dropped `,false)
        }catch (e){
            error(`>> ❌ "${tableName}": ${e}`)

        }

    }

    public async exe(action: string = '',options: {t: string,y:boolean,Force: boolean}) {

       if (!this.connection)
           throw new Error('Connection not found')


        let {t: tableName} = options
        let {y: yes} = options
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
            for(let table in this.models){
                table = this.capitalize(camelCase(table))
                await (this as any)[action](table,!!force)
            }
            console.log("----------------------")
            success(`>> ✅ All models synchronized`)
            process.exit(0)

            return;
        }

        tableName = this.capitalize(camelCase(tableName))

        await (this as any)[action](tableName,!!force)

        if (force){
            await this.connection.query("SET FOREIGN_KEY_CHECKS = 1")
        }
        process.exit(0)


    }

}