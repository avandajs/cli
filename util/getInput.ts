import chalk from "chalk";
import * as readline from 'readline';
import error from "./error";




export default async function getInput (question: string, exit: boolean = true): Promise<string> {

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(chalk.yellow.yellow(question), (answer) => {
            rl.close();
            if (!answer.trim().length)
                getInput(question,exit)
            resolve(answer.toLowerCase())
        });
    })
}