import Template from "./Template";

let controller: Template = function (assetName: string, meta: {modelName?: string}){

    const {modelName} = meta;

    return `import {Controller, Request, Response, Get} from "@avanda/http";
${modelName ? `import ${assetName}Model from "../models/${modelName}"\n`:''}
export default class ${modelName} extends Controller {
    ${modelName ? `model?:  ${assetName}Model`:''}
    @Get()
    async get(response: Response,request: Request, model?: Model): Promise<any> {
        return (await this.model?.first())
    }

    @Get()
    async getAll(response: Response,request: Request, model?: Model) {
        return (await this.model?.all())
    }

    @Get()
    async getAllByPage(response: Response,request: Request, model?: Model) {
        let data = await this.model?.page(request.page,true)
        response.totalPages = this.model.totalPages
        response.currentPage = request.page
        response.perPage = this.model.perPage;
        return response.success('Data fetched',data)
    }

}
`
}

export default controller