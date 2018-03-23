# js-creator
A object creator library with validators



## Usage


```
var workshop = js-creator('ObjsA');

workshop.registor({
    Name: 'objX',
    Constructor,
    Validators: [
        {name: x, type: 'float', required: true, options: {upper: 1, lower: 0, default: 0.5}},
        {name: y, type: 'list', required: true}
    ]
})

workshop.validate("objX", {x: 1, y: [4, 8]});
workshop.create("objX", {x: 1, y: [4, 8]});

workshop.parse("objX(1, [4, 8])");
```
