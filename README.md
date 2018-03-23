# obj-creator
A object creator library with validators

## Get Started

### Load

```
var creator = require("obj-creator");
```


### Get a workshop

```
var ws = creator.getWorkshop("TestSet");
```

### Register a object factory

A name of the object, a constructor, and an list of validators are the essential component.

```
// with json format
ws.registor({
    Name: "objX",
    Constructor: function(x, y) {this.X=x; this.Y=y},
    Validators: [
        {name: "x", type: "Float", required: true, options: {upper: 100, default: 0.5}},
        {name: "y", type: "list", required: true}
    ]
})

// or with direct input
ws.registor(
    "objX",
    function(x, y) {this.X=x; this.Y=y},
    [
        {name: "x", type: "Float", required: true, options: {upper: 100, default: 0.5}},
        {name: "y", type: "String", required: true}
    ]
)
```


### Validate


```
ws.validate("objX", {x: 1, y: "StringY"});
```


### Create

Create directly
```
ws.create("objX", [1, "StringY"]);
ws.create("objX", {x: 1, y: "StringY"});
```

Create from JSON
```
ws.fromJSON({Name: "objX", Args: [1, "StringY"]});
ws.fromJSON({Name: "objX", Args: {x: 1, y: "StringY"});
```

Create with function string
```
ws.parse("objX(1, 'StringY')");

// use keyword arguments
ws.parse("objX(1, y='StringY')");
```


## API Reference

### workshop



### validators


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

