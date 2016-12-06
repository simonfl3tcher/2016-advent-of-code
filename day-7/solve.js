var first = (function() {
    var chainNames = ["then", "andThen", "next"];
    var endChainNames = ["finally", "andFinally", "last"];
    var chain = function(fn) {
        var f1 = function(g) {
            var func = function() {return g.call(this, fn.apply(this, arguments));};
            chain(func);
            return func;
        };
        var f2 = function(g) {
            return function() {return g.call(this, fn.apply(this, arguments));};
        };
        chainNames.forEach(function(name) {fn[name] = f1;});
        endChainNames.forEach(function(name) {fn[name] = f2;});
    };
    return function(f) {
        var fn = function() {
            return f.apply(this, arguments);
        };
        chain(fn);
        return fn;
    };
}());

Object.defineProperty(Object.prototype, 'andThen', {
  value: function (transform) { return transform(this); }
});

var module = (function() {

  var add1 = function(x) {return x + 1;};
  var mult2 = function(x) {return x * 2;};
  var square = function(x) {return x * x;};
  var negate = function(x) {return -x;};

  var puzzle_1 = function() {
    var x = first(add1).then(mult2).andFinally(square);
    console.log(add1(2).andThen(mult2).andThen(square));
    console.log(x(2));
    return 1;
  }

  var puzzle_2 = function() {
    return 2;
  }

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
