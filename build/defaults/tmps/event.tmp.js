"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command = function (assetName, meta) {
    return "import {Broadcastable} from \"@avanda/http\";\n    export default class " + assetName + " extends Broadcastable{\n        get channel(): string {\n            return 'testing-event';\n        }\n        payload(): any {\n            return {\n                name: 'adewale',\n                pay: 'load'\n            }\n        }\n    \n        async defaultPayload(): Promise<any> {\n            return {\n                name: 'adewale',\n                pay: 'load default'\n            }\n        }\n    \n    }";
};
exports.default = command;
