"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let command = function (assetName, meta) {
    return `import {Column,Model} from "@avanda/orm";

export default class ${assetName} extends Model{
    @Column.text({
        masSize: 20,
        nullable: true
    })
    sample_column?:string;
}`;
};
exports.default = command;
