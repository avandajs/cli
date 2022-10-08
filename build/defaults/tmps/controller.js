"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller = function (assetName, meta) {
    var modelName = meta.modelName;
    return "import {Controller, Request, Response, Get} from \"@avanda/http\";\n" + (modelName ? "import " + assetName + "Model from \"../models/" + modelName + "\"\n" : '') + "\nexport default class " + modelName + " extends Controller {\n    " + (modelName ? "model?:  " + assetName + "Model" : '') + "\n    @Get()\n    async get(response: Response,request: Request, model?: Model): Promise<any> {\n        return (await this.model?.first())\n    }\n\n    @Get()\n    async getAll(response: Response,request: Request, model?: Model) {\n        return (await this.model?.all())\n    }\n\n    @Get()\n    async getAllByPage(response: Response,request: Request, model?: Model) {\n        let data = await this.model?.page(request.page,true)\n        response.totalPages = this.model.totalPages\n        response.currentPage = request.page\n        response.perPage = this.model.perPage;\n        return response.success('Data fetched',data)\n    }\n\n}\n";
};
exports.default = controller;
