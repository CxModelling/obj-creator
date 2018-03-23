# js-creator
A object creator library with validators



## Usage


```
var workshop = creator.getWorksop("ObjsA");

workshop.registor({
    Name: "objX",
    Constructor: function(x, y) {this.X=x; this.Y=y},
    Validators: [
        {name: "x", type: "Float", required: true, options: {upper: 100, default: 0.5}},
        {name: "y", type: "list", required: true}
    ]
})

workshop.validate("objX", {x: 1, y: [4, 8]});
workshop.create("objX", {x: 1, y: [4, 8]});

workshop.parse("objX(1, [4, 8])");
```
