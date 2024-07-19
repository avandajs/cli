import Template from "./Template";

let command: Template = function (assetName: string,meta: object){

    return `import {Broadcastable} from "@avanda/http";
    export default class ${assetName} extends Broadcastable{
        get channel(): string {
            return 'testing-event';
        }
        payload(): any {
            return {
                name: 'adewale',
                pay: 'load'
            }
        }
    
        async defaultPayload(): Promise<any> {
            return {
                name: 'adewale',
                pay: 'load default'
            }
        }
    
    }`
}

export default command