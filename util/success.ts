import chalk from "chalk";

export default function (text: string, exit: boolean = true) {
    console.log('\n' + chalk.green.green(text))

    if (exit) process.exit(0)
}