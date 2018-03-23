const tape = require("tape"),
    creator = require("../build/obj-creator");


tape("creator validation", function(test) {
    const point = function(x, y, colour) {this.X=x; this.Y=y; this.Colour=colour;},
          args = [
              {name: "x", type: "Float"},
              {name: "y", type: "PositiveFloat"},
              {name: "colour", type: "String", required: false}
          ],
          ct = new creator.Creator("point", point, args),
          creation = ct.create([0, 1, "green"]);
    
    test.ok(ct.validateArguments([0, 0, "green"]));
    test.notOk(ct.validateArguments([0, -1, "green"]));
    
    test.ok(ct.validateArguments([0, 0]));
    test.notOk(ct.validateArguments([0, -1]));
    
    test.ok(ct.validateArguments({x: 0, y: 0}));
    test.notOk(ct.validateArguments({x: 0, y: -1}));
    
    test.deepEqual(ct.parseArguments("0, 1, colour='green'"), [0, 1, "green"]);
    test.deepEqual(ct.arrangeArguments([0, -1, "green"]), [0, -1, "green"]);
    test.deepEqual(ct.correctArguments([0, -1, "green"]), [0, 0, "green"]);
    test.equal(creation.X, 0)
    test.end();
});


tape("singleton validation", function(test) {
    const ws1 = creator.getWorkshop("ws1"), ws1_1 = creator.getWorkshop("ws1");

    test.equal(ws1, ws1_1);

    test.end();
});


tape("creation validation", function(test) {
    const ws = creator.getWorkshop("ws1");
    ws.register({
        Name: "Point",
        Constructor: function(x, y, colour) {this.X=x; this.Y=y; this.Colour=colour;},
        Validators: [
            {name: "x", type: "Float"},
            {name: "y", type: "PositiveFloat"},
            {name: "colour", type: "Option", required: false, options: {list:{green: "Green", blue: "Blue"}}}
        ]         
    })
    
    ws.register(
        "Text",
        function(x, y, text) {this.X=x; this.Y=y; this.Text=text;},
        [
            {name: "x", type: "Float"},
            {name: "y", type: "PositiveFloat"},
            {name: "text", type: "String"}
        ]         
    )
    
    const pt1 = ws.create("Point", [0, 0, "green"]),
          pt2 = ws.create("Point", [0, -1, "green"], true),
          pt3 = ws.create("Point", {x: 0, y: 0, colour: "green"}, true)
    
    test.deepEqual(pt1, pt2)
    test.deepEqual(pt1, pt3)
    test.deepEqual(pt1, ws.fromJSON({Name: "Point", Args: {x: 0, y: 0, colour: "green"}}));
    test.deepEqual(pt1, ws.fromJSON({Name: "Point", Args: [0, 0, "green"]}));
    test.deepEqual(pt1, ws.parse("Point(0, 0, 'green')"));
    test.deepEqual(pt1, ws.parse("Point(0, 0, colour='green')"));
    test.notOk(ws.parse("Point(0, y=0, 'green')"));
    test.ok(ws.validate("Text", [5, 5, "test"]))
    test.end();
});


tape("resources use", function(test) {
    const ws = creator.getWorkshop("ws1");
    

    test.end();
});
