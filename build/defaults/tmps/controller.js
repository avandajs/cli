"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller = function (assetName, meta) {
    var modelName = meta.modelName;
    return "import {Controller, Request, Response, Get} from \"@avanda/http\";\n" + (modelName ? "import " + assetName + "Model from \"../models/" + modelName + "\"\n" : '') + "\nexport default class " + modelName + " extends Controller {\n    " + (modelName ? "model?:  " + assetName + "Model" : '') + "\n    @Get()\n    async get(res: Response,req: Request) {\n        return (await this.model?.first())\n    }\n\n    @Get()\n    async getAll(res: Response,req: Request) {\n        return (await this.model?.all())\n    }\n\n    @Get()\n    async getAllByPage(res: Response,req: Request) {\n        return res.pagedData(req)\n    }\n}\n";
};
exports.default = controller;
