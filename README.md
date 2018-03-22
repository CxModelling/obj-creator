# js-creator
A object creator library with validators



## Usage


```
var workshop = js-creator('ObjsA');

workshop.registor({
    Name: 'objX',
    Constructor,
    Validators: [
        {Name: x, Type: 'float', Required: true, Options: {upper: 1, lower: 0, default: 0.5}},
        {Name: y, Type: 'list', Required: true}
    ]
})

workshop.validate("objX", {x: 1, y: [4, 8]});
workshop.create("objX", {x: 1, y: [4, 8]});

workshop.parse("objX(1, [4, 8])");
```
