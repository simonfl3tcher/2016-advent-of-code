var fs = require('fs');

var module = (function() {
  const input = fs.readFileSync('./input.txt').toString().replace(/ /g, '').split(',')

  var run = function() {
    var occurance_array = [];
    var first_occurance_of_step;
    var orientation = 0;
    var xy = {
      x: 0,
      y: 0
    }

    var rotate = (move) => {
      var mv = move.substring(0, 1);

      if ( mv == 'R' ) {
        if(orientation == 3) {
          orientation = 0;
        } else {
          orientation += 1;
        }

      } else if ( mv == 'L' ) {
        if(orientation == 0) {
          orientation = 3;
        } else {
          orientation -= 1;
        }
      }

      return orientation;
    }

    var take_move = function(move, acc) {
      var x = rotate(move);
      var length = parseInt(move.substring(1));

      switch(x){
        case 0:
          return loop_steps(acc, 'y', '+', length);
          break;
        case 1:
          return loop_steps(acc, 'x', '+', length);
          break;
        case 2:
          return loop_steps(acc, 'y', '-', length);
          break;
        case 3:
          return loop_steps(acc, 'x', '-', length);
          break;
      }
    }

    var loop_steps = function(acc, key, positive_or_negative, length) {
      for (i = 1; i <= length; i++) {
        if(positive_or_negative == '+'){
          acc[key] += 1;
        } else {
          acc[key] -= 1;
        }
        do_occurance_check(acc);
      }
      return acc;
    }

    var do_occurance_check = function(acc) {
      var str = acc.x + '.' + acc.y;
      if(!first_occurance_of_step && occurance_array.indexOf(str) > -1) {
        first_occurance_of_step = str;
      }
      occurance_array.push(str);
    }

    var take_steps = function(moves) {
      return moves.reduce(function(acc, value){
        return take_move(value, acc);
      }, xy)
    }

    var calculate_result = () => {
      obj = take_steps(input);
      return Math.abs(obj.x) + Math.abs(obj.y);
    }

    var calculate_first_occurance_step = () => {
      array = first_occurance_of_step.split('.');
      return Math.abs(array[0]) + Math.abs(array[1]);
    }

    console.log("Puzzle 1: " + calculate_result());
    console.log("Puzzle 2: " + calculate_first_occurance_step());
  }

  return {
    run: run
  };
})();

