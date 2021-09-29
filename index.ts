#! /usr/bin/env ts-node

import {Command, program} from 'commander'
import * as defaultCommands from "./defaults/.boot"
//@ts-ignore
import * as userCommands from "../../app/commands/.boot"
import CommandLine from "./CommandLine";
import chalk from "chalk";



// console.log(chalk.yellow.yellow('hello world'))

let allCommands = {...defaultCommands, ...userCommands}



for(let c in allCommands){
    // @ts-ignore
    let command = new allCommands[c]() as CommandLine;

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