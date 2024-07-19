import Template from "./Template";

let controller: Template = function (assetName: string, meta: {modelName?: string}){

    const {modelName} = meta;

    return `import {Controller, Request, Response, Get} from "@avanda/http";
${modelName ? `import ${assetName}Model from "../models/${modelName}"\n`:''}
export default class ${modelName} extends Controller {
    ${modelName ? `model?:  ${assetName}Model`:''}
    @Get()
    async get(res: Response,req: Request) {
        return (await this.model?.first())
    }

    @Get()
    async getAll(res: Response,req: Request) {
        return (await this.model?.all())
    }

    @Get()
    async getAllByPage(res: Response,req: Request) {
        return res.pagedData(req)
    }
}
`
}

export default controller