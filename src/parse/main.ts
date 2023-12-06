import { Env } from './env'
import { BleaveSyntax, BleaveCommand, BleaveType } from './bleaveSyntax';
import chalk from 'chalk';

export class Parser {
    private env: Env;
    constructor() {
        this.env = new Env()
    }
    out(str: any) {
        console.log(str)
    }
    err(str: any) {
        console.error(str)
    }
    wrn(str: any) {
        console.log(chalk.yellow(str))
    }
    xAs(id: string, val: any) {
        this.env.declareVar(id, val)
    }
    parse(syntax: BleaveSyntax) {
        var i: BleaveCommand;
        for (i of syntax.body) {
            // @ts-ignore
            if (i.type == BleaveType.SetVariable) {
                this.wrn("Ignoring variable set")
            }
            //@ts-ignore
            if (i.type == BleaveType.Console) {
                //@ts-ignore
                this.out(i.args.other.value)
            }
            //@ts-ignore
            if (i.type == BleaveType.Exit) {
                process.exit(0)
            }
        }
    }
}