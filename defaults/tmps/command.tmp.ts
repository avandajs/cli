import Template from "./Template";

let command: Template = function (assetName: string,meta: {cmdName: string,cmdDescription: string}){

    const {cmdName} = meta;
    const {cmdDescription} = meta;
    return `import { CommandLine } from "@avanda/cli";
import {Out} from "@avanda/cli";


export default class ${assetName} implements CommandLine {
    command: string = "${cmdName?.trim()?.length ? cmdName : assetName.toLowerCase()} <target>";
    description: string = "${cmdDescription?.trim()?.length ? cmdDescription : 'generate a bootstrapper'}";


    public exe(target: string = '',options: object) {
        Out.success('this is coming from ${assetName}')
    }

}`
}

export default command