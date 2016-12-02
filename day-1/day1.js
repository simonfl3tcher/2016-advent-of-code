var fs = require('fs');

var module = (function() {
  const input = fs.readFileSync('./input.txt').toString().replace(/ /g, '').split(',')

  var run = function() {
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
      var length = move.substring(1);

      switch(x){
        case 0:
          acc.y += parseInt(length)
          loop_steps(acc, 'y', '+', length);
          break;
        case 1:
          acc.x += parseInt(length)
          loop_steps(acc, 'x', '+', length);
          break;
        case 2:
          acc.y -= parseInt(length)
          loop_steps(acc, 'y', '-', length);
          break;
        case 3:
          acc.x -= parseInt(length)
          loop_steps(acc, 'x', '-', length);
          break;
      }

      return acc;
    }

    var do_occurance_check = function() {
      console.log('123');
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

    console.log(calculate_result());
  }

  return {
    run: run
  };
})();

