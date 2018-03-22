const tape = require("tape"),
    vld = require("../build/js-creator").vld;


tape("not null validation", function(test) {
    const res = {x: 5}, v = new vld.NotNull("X");

    test.notOk(v.check());
    test.ok(v.check(false));
    test.equal(v.correct("x", res), 5);
    test.equal(v.correct(5, res), 5);
    test.end();
});

tape("float number validation", function(test) {
    const res = {x: 5.0}, v = new vld.Float("X", 0, 20, 10);

    test.notOk(v.check("string"));
    test.ok(v.check(5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 5);
    test.equal(v.correct("x", res), 5);
    test.equal(v.correct("y", res), 10);
    test.end();
});

tape("positive float number validation", function(test) {
    const res = {x: 5.0}, v = new vld.PositiveFloat("X", 10);

    test.notOk(v.check("string"));
    test.ok(v.check(5.0));
    test.notOk(v.check(-5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 5);
    test.equal(v.correct(-5, res), 0);
    test.equal(v.correct("x", res), 5);
    test.equal(v.correct("y", res), 10);
    test.end();
});

tape("negative float number validation", function(test) {
    const res = {x: -5.0}, v = new vld.NegativeFloat("X", -10);

    test.notOk(v.check("string"));
    test.ok(v.check(-5.0));
    test.notOk(v.check(5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 0);
    test.equal(v.correct(-5, res), -5);
    test.equal(v.correct("x", res), -5);
    test.equal(v.correct("y", res), -10);
    test.end();
});


tape("negative float number validation", function(test) {
    const res = {x: -5.0}, v = new vld.NegativeFloat("X", -10);

    test.notOk(v.check("string"));
    test.ok(v.check(-5.0));
    test.notOk(v.check(5.0));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), 0);
    test.equal(v.correct(-5, res), -5);
    test.equal(v.correct("x", res), -5);
    test.equal(v.correct("y", res), -10);
    test.end();
});


tape("integer number validation", function(test) {
    const res = {x: 5}, v = new vld.Integer("X", 0, 20, 10);

    test.notOk(v.check("string"));
    test.ok(v.check(5));
    test.ok(v.check("x", res));
    test.equal(v.correct(5.5, res), 5);
    test.equal(v.correct("x", res), 5);
    test.equal(v.correct("y", res), 10);
    test.end();
});


tape("string validation", function(test) {
    const res = {x: "y"}, v = new vld.String("X");

    test.notOk(v.check(5));
    test.ok(v.check("string"));
    test.ok(v.check("x", res));
    test.equal(v.correct(5, res), "5");
    test.equal(v.correct("x", res), "y");
    test.equal(v.correct("y", res), "y");
    test.end();
});


tape("list validation", function(test) {
    const res = {x: [1, 2, 3]}, v = new vld.List("X", 3);

    test.notOk(v.check(5));
    test.notOk(v.check([1, 2]));
    test.ok(v.check("[1, 2, 3]"));
    test.ok(v.check([1, 2, 3]));
    test.ok(v.check("x", res));
    test.deepEqual(v.correct([1, 2, 3], res), [1, 2, 3]);
    test.deepEqual(v.correct("x", res), [1, 2, 3]);
    test.end();
});


tape("Options validation", function(test) {
    const res = {x: {a: 1, b: 2}}, v = new vld.Options("X");

    test.notOk(v.check(5));
    test.ok(v.check("[1, 2, 3]"));
    test.ok(v.check([1, 2, 3]));
    test.ok(v.check({a: 1, b: 2}));
    test.ok(v.check("x", res));
    test.deepEqual(v.correct([1, 2, 3], res), {0: 1, 1: 2, 2: 3});
    test.deepEqual(v.correct("x", res), {a: 1, b: 2});
    test.end();
});

