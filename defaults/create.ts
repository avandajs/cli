import CommandLine from "../CommandLine";
import fs, {Dirent, write} from "fs"
import path from "path"
import Boot from "./boostraper"
import {camelCase, kebabCase} from "lodash";
import {error, success} from "../out";
import getInput from "../out/getInput";
import commandTmp from "./tmps/command.tmp";
import modelTmp from "./tmps/model.tmp";
import seederTmp from "./tmps/seeder.tmp";
import middlewareTmp from "./tmps/middleware.tmp";
import controllerTmp from "./tmps/controller";

export default class Create implements CommandLine {
    command: string = "create <asset>";
    description: string = "This command automatically generates assets for you";

    options: { option: string; description: string; }[] = [
        {
            option: '-n <name>',
            description: 'Asset name'
        },
        {
            option: '-all',
            description: 'Create all necessary assets at once'
        },

    ]

    writePaths: {[k: string]: string} = {
        command: "./app/commands",
        controller: "./app/controllers",
        middleware: "./app/middlewares",
        model: "./app/models",
        seeder: "./app/seeders",
    }

    private async modelCreate(assetName: string){

        let template = modelTmp(assetName,{})

        Create.writeCode(template,this.writePaths.model + '/' + assetName + '.ts')

        success('Model code successfully generated',false)
        await (new Boot()).exe(this.writePaths.model,{})
    }
    private async seederCreate(assetName: string){

        let template = seederTmp(assetName,{})

        Create.writeCode(template,this.writePaths.seeder + '/' + assetName + '.ts')

        success('seeder code successfully generated',false)
        await (new Boot()).exe(this.writePaths.seeder,{})
    }
    private async middlewareCreate(assetName: string){

        let template = middlewareTmp(assetName,{})

        Create.writeCode(template,this.writePaths.middleware + '/' + assetName + '.ts')

        success('Model code successfully generated',false)
        await (new Boot()).exe(this.writePaths.middleware,{})
    }

    private async controllerCreate(assetName: string, autoLinkModel = false){


        let meta: {modelName?: string} = {};

        // get command name
        meta.modelName = autoLinkModel ? assetName :  Create.toUpper(await getInput('Enter an existing model name'))

        if (!autoLinkModel && meta.modelName.trim().length && !fs.existsSync(this.writePaths.model + '/' + meta.modelName + '.ts')){
            error('Model with name: "' + meta.modelName + '" does not exist')
            return
        }

        let template = controllerTmp(assetName, meta)

        Create.writeCode(template,this.writePaths.controller + '/' + assetName + '.ts')

        success('Controller code successfully generated', false)
        await (new Boot()).exe(this.writePaths.controller,{})



    }

    private async commandCreate(assetName: string){


        let meta: {cmdName?: string, cmdDescription?: string} = {};

        // get command name
        meta.cmdName = (await getInput('Enter command name (Leave empty to use file name)'))
        meta.cmdDescription = (await getInput('Enter command description'))

        let template = commandTmp(assetName, meta)

        Create.writeCode(template,this.writePaths.command + '/' + assetName + '.ts')

        await (new Boot()).exe(this.writePaths.command,{})

        success('Command code successfully generated')

    }

    private static writeCode(code: string, target: string, ){
        try {
            fs.writeFileSync(target,code);
        }catch (e){
            error(e as string)
        }
    }


    private static toUpper(text: string): string{

        if (!text.trim().length)
            return ""

        let text_s = text.split('')
        text_s[0] = text_s[0].toUpperCase();
        return  text_s.join('')
    }


    public async exe(asset: string = '',options: {n: string,all: any}) {

        let assetName = options?.n ?? (await getInput('Enter ' + asset + ' name:'));

        if (!assetName) {
            error('Error: specify the asset name, try again')
            return
        }

        assetName = Create.toUpper(camelCase(assetName))

        if ('all' in options){
        //    create all assets
        //    create model
            await this.modelCreate(assetName);
            await this.controllerCreate(assetName,true);
            await this.seederCreate(assetName)

            success("All necessary assets generated");

        }


        if((this as any)[asset+'Create']){
            
            (this as any)[asset+'Create'](assetName)
        }else{
            error('unsupported asset type: '+ asset)
        }
    }

}