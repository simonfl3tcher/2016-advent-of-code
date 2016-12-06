var module = (function() {
  const input = 'ugkcyxxp';

  var hash_and_hex = (str) =>
    crypto.createHash('md5').update(str).digest('hex');

  var does_num_plus_input_match_condition = (num) =>
    num.substr(0, 5) == '00000'

  var puzzle_1 = () => {
    var acc = [];
    var num = 0;
    while(true) {
      hash = hash_and_hex(input + num.toString());
      if(does_num_plus_input_match_condition(hash)){
        acc = [ ...acc, hash.substr(5,1) ]
      }

      if(acc.length == 8) {
        break;
      }
      num++;
    }

    return acc.join('');
  }

  var puzzle_2 = () => {
    var obj = {};
    var num = 0;
    while(true) {
      hash = hash_and_hex(input + num.toString());
      if(does_num_plus_input_match_condition(hash)){
        var pos  = hash.substr(5,1);
        var char = hash.substr(6,1);

        if(!(pos in obj) && parseInt(pos) < 8) {
          obj[pos] = char;
        }
      }

      if(Object.keys(obj).length == 8) {
        break;
      }
      num++;
    }

    return Object.keys(obj)
      .sort()
      .map((v) => obj[v])
      .join('');
  }

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
