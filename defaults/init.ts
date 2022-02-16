import CommandLine from "../CommandLine";
import fs, {Dirent} from "fs"
import path from "path"
import {success} from "../out";
import chalk from "chalk";

import {Out} from "../index";
var downloader = require('github-download-directory');

export default class Init implements CommandLine {
    command: string = "init <projectName>";
    description: string = "create new project";



    public exe(projectName: string = '',options: object) {
        const { exec } = require('child_process');

        Out.write(`Started creating a project: ${chalk.green(projectName)}`)

        exec(`git clone https://github.com/avandajs/avanda-starter.git ${projectName}`, (err, stdout, stderr) => {
            // handle err, stdout & stderr
            if (err){
                Out.error(stderr);
            }else{
                Out.success(`☑️ Project created successfully`, false)
                Out.write(`ℹ️ Next steps: run the commands below`)
                Out.write(`${chalk.green('[1]')} cd ${projectName}`)
                Out.write(`${chalk.green('[2]')} npm install`)
                Out.write(`${chalk.green('[3]')} npm run dev`)

            }
        });
    }

}