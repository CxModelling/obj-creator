import {Creator} from "./creator"

export class Workshop {
    constructor(name) {
        this.Name = name
        this.Creators = {}
        this.Resources = {}
    }
    
    appendResource(key, value) {
        this.Resources[key] = value
    }
   
    renewResources(res) {
        this.Resources = Object.assign({}, res)
    }

    clearResources() {
        this.Resources = {}
    }
    
    register(js) {
        if (arguments.length == 1) {
            this.Creators[js.Name] = new Creator(js.Name, js.Constructor, js.Validators)
        } else {
            this.Creators[arguments[0]] = new Creator(arguments[0], arguments[1], arguments[2])
        }
    }
    
    validate(objName, args) {
        return this.Creators[objName].validateArguments(args, this.Resources)
    }
    
    create(objName, args, correction=false) {
        const ct = this.Creators[objName]
        if (correction) {
            args = ct.correctArguments(args, this.Resources)
        } else {
            args = ct.arrangeArguments(args, this.Resources)
        }
        return ct.create(args)
    }
    
    fromJSON(js, correction=false) {
        return this.create(js.Name, js.Args, correction)
    }
    
    parse(line, correction=false) {
        const fn = /(\S+)\(/.exec(line)[1],
              argsLine = line.substring(line.indexOf("(")+1, line.lastIndexOf(")")),
              args = this.Creators[fn].parseArguments(argsLine, this.Resources)
        if (args) {
            return this.create(fn, args, correction)
        } else {
            return false
        }
    }
}