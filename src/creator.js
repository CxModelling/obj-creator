import {findValidator} from "./validator"

export class Creator {
    constructor(name, fn, args) {
        this.Name = name
        this.Constructor = fn
        this.Args = args.map(function(arg) {
            return findValidator(
                arg.name,
                arg.type,
                arg.description,
                arg.required,
                arg.options
            )
        })
    }
    
    create(args) {
        return new (Function.prototype.bind.apply(this.Constructor, [null].concat(args)))
    }
    
    arrangeArguments(args, resource) {
        const med = Object.assign({}, args)
        
        return this.Args.map(function(vld, i) {
            if (i in med) {
                return med[i]
            } else if (vld.Name in med) {
                return med[vld.Name]       
            } else {
                return null
            }
        })
    }
    
    correctArguments(args, resource) {
        const med = Object.assign({}, args)
        
        return this.Args.map(function(vld, i) {
            let arg = null
            if (i in med) {
                arg = med[i]
            } else if (vld.Name in med) {
                arg = med[vld.Name]       
            } 
            
            if (vld.check(arg, resource)) {
                return arg
            } else if (vld.Required) {
                return vld.correct(arg, resource)
            } else {
                return null
            }
        })
    }
    
    validateArguments(args, resource) {
        const med = Object.assign({}, args)

        let arg = null
        return this.Args.every(function(vld, i) {
            if (i in args) {
                arg = args[i]
            } else if (vld.Name in med) {
                arg = med[vld.Name]       
            } else if (vld.Required) {
                return false
            } else {
                return true
            }
            return vld.check(arg, resource)
        })
    }
    
    parseArguments(argsLine, resource) {
        let args = argsLine.replace(/\s+/g, "").replace(/'/g, "").split(",")  
        let eq_lock = false, wrong_order = false, arg, mat, med, res
        const pat = /(\S+)=(\S+)/
        
        med = {}
        
        for (let i = 0; i<args.length; i++) {
            arg = args[i]
            if (pat.test(arg)) {
                eq_lock = true
                mat = pat.exec(arg)
                med[mat[1]] = mat[2]
            } else if (!eq_lock) {
                med[i] = arg       
            } else {
                wrong_order = true
                med[i] = null
            }
        }
        
        if (wrong_order) return false
        
        return this.Args.map(function(vld, i) {
            if (i in med) {
                arg = med[i]
            } else if (vld.Name in med) {
                arg = med[vld.Name]       
            } else {
                arg = null
            }
            return vld.parse(arg, resource)
        })
    }
}