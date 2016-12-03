var fs = require('fs');

var module = (function() {
  const position = [1,1];
  const input = fs.readFileSync('./input.txt')
    .toString()
    .replace(/ /g, '')
    .split('\n')
    .filter(Boolean)

  var puzzle_1 = () => {
    var key = {
      "0.0": 1,
      "0.1": 2,
      "0.3": 3,
      "1.0": 4,
      "1.1": 5,
      "1.2": 6,
      "2.0": 7,
      "2.1": 8,
      "2.2": 9
    }
    var array_of_moves = input.reduce(function(acc, value) {
      acc.push(
        value.split('').reduce(function(accumulator, value) {
          switch(value) {
            case "U":
              if(accumulator[0] > 0) {
                accumulator[0] -= 1;
              }
              return accumulator;
              break;
            case "D":
              if(accumulator[0] < 2) {
                accumulator[0] += 1;
              }
              return accumulator;
              break;
            case "L":
              if(accumulator[1] > 0) {
                accumulator[1] -= 1;
              }
              return accumulator;
              break;
            case "R":
              if(accumulator[1] < 2) {
                accumulator[1] += 1;
              }
              return accumulator;
              break;
          }
        }, position).join('.')
      );

      return acc;
    }, []);

    return array_of_moves.map(function(move) {
        return key[move];
      }).join('')
  }

  var puzzle_2 = () => {
    var grid = [
      {"2": 1},
      {"1": 2, "2": 3, "3": 4},
      {"0": 5, "1": 6, "2": 7, "3": 8, "4": 9},
      {"1": "A", "2": "B", "3": "C"},
      {"2": "D"}
    ]
    var position = [2,0]

    var take_grid_step = function(step, current_position) {
      switch(step) {
        case "U":
          if(grid[current_position[0]-1] && current_position[1].toString() in grid[current_position[0]-1] && current_position[0] > 0) {
            current_position[0] -= 1;
          }
          return current_position;
          break;
        case "D":
          if(grid[current_position[0]+1] && (current_position[1].toString() in grid[current_position[0]+1]) && current_position[0] < 4) {
            current_position[0] += 1;
          }
          return current_position;
          break;
        case "L":
          if(grid[current_position[0]][current_position[1]-1] && current_position[1] > 0) {
            current_position[1] -= 1;
          }
          return current_position;
          break;
        case "R":
          if(grid[current_position[0]][current_position[1]+1] && current_position[1] < 4) {
            current_position[1] += 1;
          }
          return current_position;
          break;
      }
    }

    return input.reduce(function(acc, value) {
        var line_move =
          value.split('').reduce(function(accumulator, value) {
            return take_grid_step(value, accumulator)
          }, position)

        acc.push(
          grid[line_move[0]][line_move[1].toString()]
        );

        return acc
      }, []).join('')
  }

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();

