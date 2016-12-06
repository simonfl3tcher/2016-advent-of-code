var fs = require('fs');
require('../support');

Array.prototype.each_slice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

Array.prototype.transpose = function() {
  var a = this;
  return a[0].map((_, c) => a.map((r) => r[c]));
};

String.prototype.split_and_format = function() {
  return this.split(' ').map(Number).filter((value) => value > 0);
}

var module = (function() {
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var do_calculation = (numbers, acc) => {
    var sorted_numbers = numbers.sort((a, b) => a - b);
    var larget_value   = sorted_numbers.pop();

    if(sorted_numbers.reduce((a, b) => a + b, 0) > larget_value){
      acc += 1;
    }

    return acc;
  }

  var run_do_calculation_on_array = (array) => {
    return array.reduce((acc, numbers) => {
        if(typeof numbers == 'string') {
          numbers = numbers.split_and_format();
        }
        return do_calculation(numbers, acc);
      }, 0)
  }

  var puzzle_1 = () =>
    run_do_calculation_on_array(input)

  var puzzle_2 = () => {
    var final_array = []
    input
      .map((value) => value.split_and_format())
      .each_slice(3, (slice) =>
        final_array = final_array.concat(slice.transpose())
      )

    return run_do_calculation_on_array(final_array)
  }

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
