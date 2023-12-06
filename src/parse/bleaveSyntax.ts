/*
Bleave Syntax

because yeah
*/

export enum BleaveType {
    // Variable
    String,
    Number,
    // Command Types
    Control,
    Console,
    SetVariable,
    Exit
}

export class BleaveCommand {
    constructor(type: BleaveType, args: object) { 
            return { type: type, args: {
                other: args
            } }
        }
}

export class BleaveSyntax {
    public body: BleaveCommand[] = [

    ];
    constructor() {};
    genSyntax(code: string[], isFiddle?: boolean) {
        // close the following region if you don't want to see any of it because you don't know regex
        //#region Regex
        let varRegex = new RegExp(`(?:let|set|const)\s+[a-zA-Z_]\w*\s*=\s*("[^"\n]*"|'[^'\n]*'|[a-zA-Z_]\w*)`);
        let varStarter = new RegExp(`(?:let|set|const)\s+[a-zA-Z_]\w*\s*=\s*`); 
        let outRegex = new RegExp(`/(?:out|log)\s*\(\s*("[^"\n]*"|'[^'\n]*'|[^\s)]+)\s*\)?/gm`);
        let outStarter = new RegExp(`(?:out|log)`);
        //#endregion
        // adding support for block commenting
        let onBlockComment = false;
        for (var i in code) {
            if (onBlockComment) {
                if (code[i].endsWith("*/")) {
                    onBlockComment = false;
                }
                continue;
            }
            if (varRegex.test(code[i])) {
                this.body.push(new BleaveCommand(BleaveType.SetVariable, {
                    value: code[i].replace(varStarter,"").replace("\"", "").replace("\"", "")
                }))
            }
            else if (((code[i].startsWith("out(\"") || code[i].startsWith("log(\"")) && code[i].endsWith("\")")) || ((code[i].startsWith("out('") || code[i].startsWith("log('")) && code[i].endsWith("')"))) {
                this.body.push(new BleaveCommand(BleaveType.Console, {
                    value: code[i].replace(outStarter, "").replace("\")","").replace("(\"","").replace("')","").replace("('","")
                }))
            }
            else if (code[i] == "exit()") {
                this.body.push(new BleaveCommand(BleaveType.Exit, {}))
            }
            else if (code[i].startsWith("//") || code[i] == "") {
                // pass
            }
            else if (code[i].startsWith("/*")) {
                onBlockComment = true;
            }
            else {
                if (code[+i - 1] != "//@blv-ignore") {
                    console.error("Unexpected syntax at line ", i)
                    console.error(code[i])
                    if (!isFiddle) {
                        process.exit(1)
                    }
                }
            }
        }
    }
    /**
     * Blanks out the body
     */
    resetSyntax() {
        this.body = []
    }
}