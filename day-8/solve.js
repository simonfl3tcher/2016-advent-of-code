var module = (function() {
  const grid_rows    = 6;
  const grid_columns = 50;
  const regex = /(.*) [x|y]?\=?(\d+)[ by|x]+ ?(\d+)/
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var get_regex_matches = (str) => regex.exec(str);
  var build_grid = () =>
    [...Array(grid_rows).keys()].reduce((row, _) =>
      [...row, [...Array(grid_columns).keys()].reduce((acc, _) => [...acc, '.'], [])]
    , []);

  var rect = (acc, columns, rows) => {
    for(var i=0; i < rows; i++){
      for(var x=0; x < columns; x++){
        acc[i][x] = '#';
      }
    }
    return acc;
  }

  var rotate_row = (acc, column, by) => {
    for(var i=0; i < by; i++) {
      acc[column].unshift(acc[column].pop())
    }
    return acc;
  }

  var rotate_column = (acc, column, by) => {
    for(var i=0; i < by; i++) {
      var new_arr = []
      for(var x=0; x < acc.length; x++){
        if(x == 0){
          new_arr.push(acc[acc.length-1][column]);
        } else {
          new_arr.push(acc[x-1][column]);
        }
      }

      new_arr.forEach(function(val, index) {
        acc[index][column] = val;
      });
    }
    return acc;
  }

  var run_move = (acc, move) => {
    matches = get_regex_matches(move);
    if(!matches){
      console.log(move);
    }
    switch(matches[1]) {
      case 'rect':
        return rect(acc, matches[2], matches[3])
        break;
      case 'rotate row':
        return rotate_row(acc, matches[2], matches[3])
        break;
      case 'rotate column':
        return rotate_column(acc, matches[2], matches[3])
        break;
      default:
        return acc;
        break;
    }
  }

  var puzzle_1 = () => {
    var y = input.reduce((acc, value) => run_move(acc, value), build_grid());
    return y.reduce(function(acc, value) {
        acc += value.filter((v) => v == '#').length
        return acc;
      }, 0)
  }

  var puzzle_2 = () => {
    var y = input.reduce((acc, value) => run_move(acc, value), build_grid());
    var arr = {};
    for(var g=0; g < y[0].length; g += 7) {
      for(var c=0; c < y.length; c++) {
        var b = y[c].slice(g, g+7)
        if(g in arr){
          arr[g].push(b);
        } else {
          arr[g] = [b];
        }
      }
    }
    console.log(arr);
  }

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
