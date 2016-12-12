var module = (function() {
  const match_array = [17,61]
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var push_and_check = (acc, key, num) => {
    acc[key].num.push(num)
    if(acc[key].num.sort().join() == match_array.join()) {
      console.log("Part 1: " + key)
    }
    return acc;
  }

  var puzzle_1 = () => {
    c = input.reduce((acc, value) => {
      var moves = value.split(' ')
      switch(moves[0]) {
        case 'value':
          key = parseInt(moves.slice(-1))
          acc[key] = acc[key] || {num: [], low_to: [], high_to: []}
          acc = push_and_check(acc, key, parseInt(moves[1]))
          return acc;
          break;
        case 'bot':
          var giver  = moves[1]
          acc[giver] = acc[giver] || {num: [], low_to: [], high_to: []}
          if(moves[6]) {
            acc[giver].low_to.push(['bot', moves[6]])
          }
          if(moves[moves.length]){
            acc[giver].high_to.push(['bot', moves[moves.length]])
          }
          return acc;
          break;
      }
      return acc;
    }, {})
    return 'unknown';
  }

  var puzzle_2 = () =>
    return 'unknown';

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
