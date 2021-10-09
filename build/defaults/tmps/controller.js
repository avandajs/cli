"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let controller = function (assetName, meta) {
    const { modelName } = meta;
    return `import {Controller, Request, Response, Get} from "@avanda/http";
${modelName ? `import Model from "../models/${modelName}"\n` : ''}
export default class ${assetName} extends Controller {
    ${modelName ? 'model?: Model' : ''}
    
    @Get()
    async get(res: Response,req: Request){

        let users = ${modelName ? `await this.model
            ?.where('first_name')
            .like('%aisha')
            .orderBy('id','DESC')
            .all();` : 'null;'}
        
        return res.success<any>('hello world',users)
    }
}
`;
};
exports.default = controller;
