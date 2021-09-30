import Template from "./Template";

let middleware: Template = function (assetName: string,meta: object){

    return `import {Middleware} from "@avanda/http/middleware";
import {Request, Response} from "@avanda/http";

export default class ${assetName} implements Middleware{
    validate(res: Response, req: Request): boolean {
        return false;
    }
    onFailure(res: Response, req: Request): Response {
        // fall back response
        return res.success('This error message is showing because validate method returns false');
    }

}`
}

export default middleware