import Template from "./Template";

let command: Template = function (assetName: string,meta: object){

    return `import {Seeder} from "@avanda/orm"
import ${assetName} from "../models/${assetName}"
export default class implements Seeder{
    async run(faker: Faker.FakerStatic): Promise<void> {
        new ${assetName}().createBulk([
            /*Create multiple data here*/
        ])
    }
}`
}

export default command