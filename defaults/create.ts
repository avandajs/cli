import CommandLine from "../CommandLine";
const cliProgress = require("cli-progress");
import fs, {Dirent, write} from "fs"
import path from "path"
import Boot from "./boostraper"
import {camelCase, kebabCase} from "lodash";
import {error, success} from "../util";
import getInput from "../util/getInput";
import commandTmp from "./tmps/command.tmp";
import modelTmp from "./tmps/model.tmp";
import middlewareTmp from "./tmps/middleware.tmp";
import controllerTmp from "./tmps/controller";

export default class Create implements CommandLine {
    command: string = "create <asset>";
    description: string = "This command automatically generates assets for you";

    options: { option: string; description: string; }[] = [
        {
            option: '-n <name>',
            description: 'Asset name'
        }
    ]

    writePaths: object = {
        command: "./app/commands",
        controller: "./app/controllers",
        middleware: "./app/middlewares",
        model: "./app/models",
    }

    private async modelCreate(assetName: string){

        let template = modelTmp(assetName,{})

        // @ts-ignore
        Create.writeCode(template,this.writePaths.model + '/' + assetName + '.ts')

        success('Model code successfully generated',false)
        // @ts-ignore
        await (new Boot()).exe(this.writePaths.model,{})
    }
    private async middlewareCreate(assetName: string){

        let template = middlewareTmp(assetName,{})

        // @ts-ignore
        Create.writeCode(template,this.writePaths.middleware + '/' + assetName + '.ts')

        success('Model code successfully generated',false)
        // @ts-ignore
        await (new Boot()).exe(this.writePaths.middleware,{})
    }

    private async controllerCreate(assetName: string){


        let meta: {modelName?: string} = {};

        // get command name
        meta.modelName = Create.toUpper(await getInput('Enter an existing model name'))

        // @ts-ignore
        if (meta.modelName.trim().length && !fs.existsSync(this.writePaths.model + '/' + meta.modelName + '.ts')){
            error('Model with name: "' + meta.modelName + '" does not exist')
            return
        }

        let template = controllerTmp(assetName, meta)

        // @ts-ignore
        Create.writeCode(template,this.writePaths.controller + '/' + assetName + '.ts')

        success('Controller code successfully generated', false)
        // @ts-ignore
        await (new Boot()).exe(this.writePaths.controller,{})



    }

    private async commandCreate(assetName: string){


        let meta: {cmdName?: string, cmdDescription?: string} = {};

        // get command name
        meta.cmdName = (await getInput('Enter command name (Leave empty to use file name)'))
        meta.cmdDescription = (await getInput('Enter command description'))

        let template = commandTmp(assetName, meta)

        // @ts-ignore
        Create.writeCode(template,this.writePaths.command + '/' + assetName + '.ts')

        // @ts-ignore
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


    public async exe(asset: string = '',options: object) {

        // @ts-ignore
        let assetName = options?.n ?? (await getInput('Enter ' + asset + ' name:'));

        if (!assetName) {
            error('Error: specify the asset name, try again')
            return
        }

        assetName = Create.toUpper(camelCase(assetName))


        // @ts-ignore
        if(this[asset+'Create']){
            // @ts-ignore
            this[asset+'Create'](assetName)
        }else{
            error('unsupported asset type: '+ asset)
        }
    }

}