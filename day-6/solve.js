var fs = require('fs');

var module = (function() {
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var split_input_into_data_structure = () =>
    input.reduce((acc, value) => {
      value.split('').forEach((val, index) => {
        if(!acc[index]) {
          acc[index] = {};
        }
        acc[index][val] = acc[index][val] ? acc[index][val]+1 : 1;
      });

      return Object.assign({}, acc);
    }, {})

  var run_split_and_sort = (sort_func) => {
    var obj = split_input_into_data_structure();
    return Object.keys(obj).map((key) => {
      return sort_func.call(Object.keys(obj[key]), obj[key])[0];
    }).join('');
  }

  var puzzle_1_sort = function(obj) {
    return this.sort((a,b) => obj[b] - obj[a])
  }

  var puzzle_2_sort = function(obj) {
    return this.sort((a,b) => obj[a] - obj[b])
  }

  var run = () => {
    console.log("Puzzle 1: " + run_split_and_sort(puzzle_1_sort));
    console.log("Puzzle 2: " + run_split_and_sort(puzzle_2_sort));
  }

  return {
    run: run
  }
})();
