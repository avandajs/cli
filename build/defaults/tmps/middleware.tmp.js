"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var middleware = function (assetName, meta) {
    return "import { Middleware, Request, Response } from \"@avanda/http\";\n\nexport default class " + assetName + " implements Middleware{\n    validate(res: Response, req: Request): boolean {\n        return false;\n    }\n    onFailure(res: Response, req: Request): Response {\n        // fall back response\n        return res.success('This error message is showing because validate method returns false');\n    }\n\n}";
};
exports.default = middleware;
