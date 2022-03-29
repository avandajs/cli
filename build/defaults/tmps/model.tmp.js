"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command = function (assetName, meta) {
    return "import {Column,Model} from \"@avanda/orm\";\n\nexport default class " + assetName + " extends Model{\n    @Column.text({\n        masSize: 20,\n        nullable: true\n    })\n    sample_column?:string;\n}";
};
exports.default = command;
