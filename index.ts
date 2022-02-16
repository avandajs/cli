#! /usr/bin/env ts-node

import {Command, program} from 'commander'
import * as defaultCommands from "./defaults/.boot"
import CommandLine from "./CommandLine";
import {Sequelize} from "sequelize/types";
import * as Out from "./out";


export default function Avanda (
    commands: {[k: string]: any},
    models: {[k: string]: any},
    seeders: {[k: string]: any},
    connection?: Sequelize
){

    let allCommands = {...defaultCommands, ...commands}

    for(let c in allCommands){
        let command = new (allCommands as any)[c]() as CommandLine;
        command.connection = connection
        command.models = models
        command.seeders = seeders

        program
            .command(command.command)
            .description(command.description)
            .action((arg) => {
                command.exe(arg,program.opts())
            });

        if (command?.options){//if command has options, populate options
            command.options.forEach(option => {
                program.option(option.option,option.description)
            })
        }
        // program
    }
    program.parse()

//
}

export {
    CommandLine,
    Out
}