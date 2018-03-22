export class Validator {
    constructor(name, type, desc, optional=false) {
        this.Name = name;
        this.Type = type;
        this.Description = desc || name;
        this.Optional = Boolean(optional)
    }

    to_form() {
        return {
            'Name': this.Name,
            'Type': this.Type,
            'Description': this.Description,
            'Optional': this.Optional
        }
    }

    check(value, resource) {
        if (value == null) {
            return false;
        } else if (resource && value in resource) {
            return resource[value];
        } else {
            return value;
        }
    }

    correct(value, resource) {
        if (resource && value in resource) {
            return resource[value];
        } else {
            return value;
        }
    }
}