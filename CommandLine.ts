import {Command} from "commander";

export default interface CommandLine {
    command: string
    options?: {
        option: string,
        description: string
    }[]

    description: string
    exe(action: string,options: object): void
}