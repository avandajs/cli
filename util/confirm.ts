import chalk from "chalk";
import * as readline from 'readline';
import error from "./error";




export default async function confirm (question: string, exit: boolean = true): Promise<boolean> {

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(chalk.yellow.yellow(question) + ' [y/n] ', (answer) => {
            switch(answer.toLowerCase()) {
                case 'y':
                case 'yes':
                    resolve(true)
                    break;
                case 'n':
                case 'no':
                    resolve(false)
                    break;
                default:
                    error('Invalid response!')
                    confirm(question,exit)
                    console.log('Invalid answer!');
            }
            rl.close();
        });
    })
}