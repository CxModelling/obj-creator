class AbsValidator {
    constructor(name, type, desc, required, options, checker, corrector, parser) {
        this.Name = name
        this.Type = type
        this.Description = desc
        this.Required = required
        this.Options = options
        this.Checker = checker
        this.Corrector = corrector
        this.Parser = parser
    }

    to_form() {
        return {
            Name: this.Name,
            Type: this.Type,
            Description: this.Description,
            Required: this.Required,
            Options: this.Options
        }
    }

    to_html() {
        // todo
        return ""
    }

    check(value, resource) {
        if (value == null) {
            return false
        }
        if (resource && value in resource) {
            value = resource[value]
        }
        return this.Checker(value)
    }

    correct(value, resource) {
        if (resource && value in resource) {
            value = resource[value]
        }
        return this.Corrector(value)
    }

    parse(value, resource) {
        if (resource && value in resource) {
            value = resource[value]
        }
        value = this.Parser(value)
        if (!this.Checker(value)) {
            value = this.Corrector(value)
        }
        return value
    }
}


class Float extends AbsValidator {
    constructor(name, desc, required, options) {
        super(name, "number", desc, required, options, checkFloatNumber, correctFloatNumber, parseFloatNumber)

        if (options.lower == null) {
            options.lower = -Infinity
        }
        if (options.upper == null) {
            options.upper = Infinity
        }
        if (options.default == null) {
            options.default = 0
        }

    }
}

function checkFloatNumber(value) {
    return !(typeof value != "number" || value < this.Options.lower || value > this.Options.upper)
}

function correctFloatNumber(value) {
    value = Math.max(value, this.Options.lower)
    value = Math.min(value, this.Options.upper)
    return value
}

function parseFloatNumber(value) {
    value = parseFloat(value)
    if (isNaN(value)) {
        return this.Options.default
    } else {
        return value
    }
}

class NegativeFloat extends Float {
    constructor(name, desc, required, options) {
        super(name, desc, required, options)
        this.Options.upper = 0
    }
}


class PositiveFloat extends Float {
    constructor(name, desc, required, options) {
        super(name, desc, required, options)
        this.Options.lower = 0
    }
}


class Probability extends Float {
    constructor(name, desc, required, options) {
        super(name, desc, required, options)
        this.Options.lower = 0
        this.Options.upper = 1
    }
}


class Integer extends AbsValidator {
    constructor(name, desc, required, options) {
        super(name, "number", desc, required, options, checkIntegerNumber, correctIntegerNumber, parseIntegerNumber)

        if (options.lower == null) options.lower = -Infinity
        if (options.upper == null) options.upper = Infinity
        if (options.default == null) options.default = 0

    }
}

function checkIntegerNumber(value) {
    return !(typeof value != "number" || value != parseInt(value) ||value < this.Options.lower || value > this.Options.upper)
}

function correctIntegerNumber(value) {
    value = Math.max(value, this.Options.lower)
    value = Math.min(value, this.Options.upper)
    value = parseInt(value)
    return value
}

function parseIntegerNumber(value) {
    value = parseInt(value)
    if (isNaN(value)) {
        return this.Options.default
    } else {
        return value
    }
}


class NegativeInteger extends Integer {
    constructor(name, desc, required, options) {
        super(name, desc, required, options)
        this.Options.upper = 0
    }
}


class PositiveInteger extends Integer {
    constructor(name, desc, required, options) {
        super(name, desc, required, options)
        this.Options.lower = 0
    }
}


class String extends AbsValidator {
    constructor(name, desc, required, options) {
        super(name, "number", desc, required, options, checkString, correctString, parseString)
    }
}

function checkString(value) {
    return (typeof value == "string")
}

function correctString(value) {
    return "" + value
}

function parseString(value) {
    return value
}


class Dictionary extends AbsValidator {
    constructor(name, desc, required, options) {
        super(name, "object", desc, required, options, checkDictionary, correctDictionary, parseDictionary)
        if (options.defalut == null) options.defalut = {True: 0, False: 1}
    }
}

function checkDictionary(value) {
    return (typeof value == "object")
}

function correctDictionary(value) {
    if (typeof value == "string") eval("value="+ value)
    if (typeof value != "object") value = this.Options.default
    return value
}

function parseDictionary(value) {
    eval("value="+ value)
    return value
}


class Option extends AbsValidator {
    constructor(name, desc, required, options) {
        super(name, "string", desc, required, options, checkOption, correctOption, parseOption)
        if (options.list == null) options.list = {"0": "false", "1": "true"}
        if (options.default == null) options.default = Object.keys(options.list)[0]
    }
}

function checkOption(value) {
    return (typeof value == "string" && value in this.Options.list)
}

function correctOption(value) {
    value = "" + value;
    if (value in this.Options.list) {
        return value;
    } else {
        return this.Options.default
    }
}

function parseOption(value) {
    return value
}


const vlds = {
    Float: Float,
    NegativeFloat: NegativeFloat,
    PositiveFloat: PositiveFloat,
    Probability: Probability,
    Integer: Integer,
    NegativeInteger: NegativeInteger,
    PositiveInteger: PositiveInteger,
    Dictionary: Dictionary,
    Option: Option,
    String: String
}

export function findValidator(vldName, vldType, vldDesc = null, required = true, options = null) {
    return new vlds[vldType](vldName, vldDesc || vldName, Boolean(required), options || {})
}

export function addValidator(vldType, dataType, checker, corrector, parser) {
    try {
        if (vldType in vlds) throw "Validator name used"

        class vld extends AbsValidator {
            constructor(name, desc, required, options) {
                super(name, vldType, desc, required, options, checker, corrector, parser)
            }
        }

        vlds[vldType] = vld
    } catch (err) {
        return false    
    }
}
