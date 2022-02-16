"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller = function (assetName, meta) {
    var modelName = meta.modelName;
    return "import {Controller, Request, Response, Get} from \"@avanda/http\";\n".concat(modelName ? "import ".concat(assetName, " from \"../models/").concat(modelName, "\"\n") : '', "\nexport default class extends Controller {\n    ").concat(modelName ? 'model?: ' + assetName : '', "\n    \n    @Get()\n    async get(res: Response,req: Request){\n\n        let users = ").concat(modelName ? "await this.model\n            ?.where('first_name')\n            .like('%aisha')\n            .orderBy('id','DESC')\n            .all();" : 'null;', "\n        \n        return res.success<any>('hello world',users)\n    }\n}\n");
};
exports.default = controller;
