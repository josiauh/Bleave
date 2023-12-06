import * as os from 'os'

class Variable {
    public id;
    public vl;
    constructor(id: string, vl: any) {
        this.id = id;
        this.vl = vl;
    }
    setVal(newVal: any) {
        this.vl = newVal;
    }
}
export class Env {
    private osVar = new Variable("os", `${os.type()} Version ${os.release()} (${os.platform()})`);
    private variables: Variable[] = [
        this.osVar
    ];

    private resetVariablesList: Variable[] = [
        this.osVar
    ];

    declareVar(id: string, val: any) {
        for (var i in this.variables) {
            if (this.variables[i].id == id) {
                return;
            }
        }
        this.variables.push(new Variable(id, val));
    }

    getVar(id: string) {
        for (var i in this.variables) {
            if (this.variables[i].id == id) {
                return this.variables[i].vl;
            }
        }
    }

    setVar(id: string, val: any) {
        for (var i in this.variables) {
            if (this.variables[i].id == id) {
                //@ts-ignore
                this.variables[i].id.setVal(val);
                return;
            }
        }
    }

    discardEnv() {
        this.variables = this.resetVariablesList;
    }
}