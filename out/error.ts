import chalk from "chalk";

export default function (text: string) {
    console.log(chalk.red.red(text))
    process.exit(0)
}