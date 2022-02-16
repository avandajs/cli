import {Command} from "commander";
import {Sequelize} from "sequelize/types";
import {Model, Seeder} from "@avanda/orm"

export default interface CommandLine {
    command: string
    models?: {[k: string]: new (connection: Sequelize) => Model}
    seeders?: {[k: string]: new () => Seeder}
    connection?: Sequelize
    options?: {
        option: string,
        description: string
    }[]

    description: string
    exe(action: string,options: object): void
}