const tape = require("tape"),
    creator = require("../build/js-creator");


tape("float number validation", function(test) {
    const res = {x: 5.0, xs: "5.0"}, v = creator.findValidator("X", "Float", "X", true, {lower: 0, upper: 20, default: 10});

    test.notOk(v.check("string"));
    test.ok(v.check(5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 5.0);
    test.equal(v.correct("x", res), 5.0);
    test.equal(v.parse("xs", res), 5.0);
    test.end();
});

tape("positive float number validation", function(test) {
    const res = {x: 5.0}, v = creator.findValidator("X", "PositiveFloat", "X", true, {default: 10});

    test.notOk(v.check("string"));
    test.ok(v.check(5.0));
    test.notOk(v.check(-5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 5);
    test.equal(v.correct(-5, res), 0);
    test.equal(v.correct("x", res), 5);
    test.end();
});

tape("negative float number validation", function(test) {
    const res = {x: -5.0}, v = creator.findValidator("X", "NegativeFloat", "X", true, {default: -10});

    test.notOk(v.check("string"));
    test.ok(v.check(-5.0));
    test.notOk(v.check(5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 0);
    test.equal(v.correct(-5, res), -5);
    test.equal(v.correct("x", res), -5);
    test.end();
});

tape("integer number validation", function(test) {
    const res = {x: 5, xs: "5"}, v = creator.findValidator("X", "Integer", "X", true, {lower: 0, upper: 20, default: 10});

    test.notOk(v.check("string"));
    test.notOk(v.check(5.5));
    test.ok(v.check(5));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 5);
    test.equal(v.correct("x", res), 5);
    test.equal(v.parse("xs", res), 5);
    test.end();
});

tape("positive integer number validation", function(test) {
    const res = {x: 5}, v = creator.findValidator("X", "PositiveInteger", "X", true, {default: 10});

    test.notOk(v.check("string"));
    test.ok(v.check(5));
    test.notOk(v.check(-5));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 5);
    test.equal(v.correct(-5, res), 0);
    test.equal(v.correct("x", res), 5);
    test.end();
});

tape("negative integer number validation", function(test) {
    const res = {x: -5}, v = creator.findValidator("X", "NegativeInteger", "X", true, {default: -10});

    test.notOk(v.check("string"));
    test.ok(v.check(-5));
    test.notOk(v.check(5));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 0);
    test.equal(v.correct(-5, res), -5);
    test.equal(v.correct("x", res), -5);
    test.end();
});

tape("string validation", function(test) {
    const res = {x: "y"}, v = creator.findValidator("X", "String", "X", true);

    test.notOk(v.check(5));
    test.ok(v.check("string"));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), "5");
    test.equal(v.correct("x", res), "y");
    test.equal(v.correct("y", res), "y");
    test.end();
});

tape("dictionary validation", function(test) {
    const res = {x: ["A", "B"], y: {a: "A", b: "B"}}, 
          v = creator.findValidator("X", "Dictionary", "X", true);

    test.notOk(v.check("string"));
    test.ok(v.check(["A", "B"]));
    test.ok(v.check({a: "A", b: "B"}));
    test.ok(v.check("x", res));
    test.ok(v.check("y", res));
    test.deepEqual(v.correct(["A", "B"], res), {0: "A", 1: "B"});
    test.deepEqual(v.correct("x", res), {0: "A", 1: "B"});
    test.deepEqual(v.correct("y", res), {a: "A", b: "B"});
    test.deepEqual(v.parse("{'a': 'A', 'b': 'B'}"), {a: "A", b: "B"});
    test.end();
});

tape("option validation", function(test) {
    const res = {x: "a"},
          list = {a: "A", b: "B"},
          def = Object.keys(list)[0],
          v = creator.findValidator("X", "Option", "X", true, {list: list});

    test.notOk(v.check("string"));
    test.ok(v.check("a"));
    test.ok(v.check("x", res));
    test.equal(v.correct("x", res), "a");
    test.equal(v.correct("y", res), def);
    test.end();
});

