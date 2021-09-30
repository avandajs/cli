import Template from "./Template";

let command: Template = function (assetName: string,meta: object){

    return `import {Column,Model} from "@avanda/orm";

export default class ${assetName} extends Model{
    @Column.text({
        masSize: 20,
        nullable: true
    })
    sample_column?:string;
}`
}

export default command