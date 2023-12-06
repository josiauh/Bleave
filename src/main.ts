import * as readline from 'readline/promises';
import { readFile, readFileSync } from "fs";
import { Parser } from './parse/main';
import { BleaveSyntax } from './parse/bleaveSyntax';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const file = process.argv[2];

let parser = new Parser();
if (file) {
    const txt = readFile(file, (err, txt) => {
        runText(txt.toString())
    })
} else {
    fiddleMode()
}

async function fiddleMode() {
    console.log("Fiddling mode");
    let stillFiddling = true;
    let newSyntax = new BleaveSyntax();
    while (stillFiddling) {
        const input = await rl.question(`> `);
        newSyntax.genSyntax([input], true);
        parser.parse(newSyntax)
        newSyntax.resetSyntax()
    }
}

async function runText(txt: string) {
    let seperatedText: string[] = txt.split("\n");
    let newTextArray: string[] = []
    for (var i of seperatedText) {
        newTextArray.push(i.replace("\r", ""))
    }
    let newSyntax = new BleaveSyntax();
    newSyntax.genSyntax(newTextArray);
    parser.parse(newSyntax)
    process.exit(0)
}