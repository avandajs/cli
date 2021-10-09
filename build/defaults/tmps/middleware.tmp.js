"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let middleware = function (assetName, meta) {
    return `import { Middleware, Request, Response } from "@avanda/http";

export default class ${assetName} implements Middleware{
    validate(res: Response, req: Request): boolean {
        return false;
    }
    onFailure(res: Response, req: Request): Response {
        // fall back response
        return res.success('This error message is showing because validate method returns false');
    }

}`;
};
exports.default = middleware;
