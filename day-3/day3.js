var fs = require('fs');

Array.prototype.each_slice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

Array.prototype.transpose = function() {
  var a = this;
  return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
};

String.prototype.split_and_format = function() {
  return this.split(' ').map(Number).filter(function(value) { return value > 0 });
}

var module = (function() {
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var do_calculation = function(numbers, acc) {
    var sorted_numbers = numbers.sort((a, b) => a - b);
    var larget_value   = sorted_numbers.pop();

    if(sorted_numbers.reduce((a, b) => a + b, 0) > larget_value){
      acc += 1;
    }

    return acc;
  }

  var run_do_calculation_on_array = function(array) {
    return array.reduce(function(acc, numbers) {
        if(typeof numbers == 'string') {
          numbers = numbers.split_and_format();
        }
        return do_calculation(numbers, acc);
      }, 0)
  }

  var one = () => {
    console.log(
      run_do_calculation_on_array(input)
    )
  }

  var two = () => {
    var final_array = []
    var split_and_formatted_array =
      input.map(function(value) {
        return value.split_and_format()
      });

    split_and_formatted_array.each_slice(3, function (slice){
      final_array = final_array.concat(slice.transpose());
    });

    console.log(
      run_do_calculation_on_array(final_array)
    )
  }

  return {
    one: one,
    two: two
  }
})();
