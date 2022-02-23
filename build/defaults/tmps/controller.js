"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller = function (assetName, meta) {
    var modelName = meta.modelName;
    return "import {Controller, Request, Response, Get} from \"@avanda/http\";\n".concat(modelName ? "import ".concat(assetName, "Model from \"../models/").concat(modelName, "\"\n") : '', "\nexport default class ").concat(modelName, " extends Controller {\n    ").concat(modelName ? "model?:  ".concat(assetName, "Model") : '', "\n    \n    @Get()\n    async get(res: Response,req: Request){  \n        return res.success<any>('hello world',this.model?.first())\n    }\n}\n");
};
exports.default = controller;
