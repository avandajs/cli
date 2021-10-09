import {Command} from "commander";
import {Sequelize} from "sequelize";
import {Model} from "@avanda/orm"

export default interface CommandLine {
    command: string
    models?: {[k: string]: new (connection: Sequelize) => Model}
    connection?: Sequelize
    options?: {
        option: string,
        description: string
    }[]

    description: string
    exe(action: string,options: object): void
}