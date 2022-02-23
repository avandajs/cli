import CommandLine from "../CommandLine";
import fs, {Dirent} from "fs"
import path from "path"
import {success} from "../out";


export default class Boostrap implements CommandLine {
    command: string = "bootstrap <target>";
    description: string = "generate a bootstrapper";

    userCommands: string = "../../../app/commands";
    defaultCommands: string = "./defaults";

    private static capitalize(file: string| string[]): string | null{
        if (typeof file === "string") {
            file = file?.split('')
            file[0] = file[0].toUpperCase();//COn
            file = file.join('').replace(/[^\w]+/i,'')
            return file;
        }
        return null
    }

    public exe(target: string = '',options?: object,exit = true) {

        let code = ``;
        let imports = ``;
        let exports = `export default{`

        let files = fs.readdirSync(target,{ withFileTypes: true })

        for (let index = 0; index < files.length; index++){

            let file: Dirent | path.ParsedPath;

            file = files[index]

            if (!file.isFile())
                continue;

            file = path.parse(file.name);

            if (!(file.ext == 'ts' || file.ext == 'js') && file.name === '.boot')//skip the main boot file
                continue;

            let cappedFile = Boostrap.capitalize(file.name)

            imports += `import ${cappedFile} from "./${file.name}"; \n`

            exports += `\n\t${cappedFile},`
        }
        exports += '\n}';

        code = `${imports}${exports}`


        fs.writeFileSync(`${target}/.boot.ts`,code);
        // Write
        success(`>> .boot file generted in: ${target}`,exit)
        // console.log(code)
    }

}