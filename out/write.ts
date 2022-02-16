
export default function (text: string, exit: boolean = false) {
    console.log('\n' + text)

    if (exit) process.exit(0)
}