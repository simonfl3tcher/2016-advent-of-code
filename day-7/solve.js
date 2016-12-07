var module = (function() {
  const regex_1_bracket = /\[\w*(\w)((?!\1)\w)\2\1\w*\]/
  const regex_1 = /(\w)((?!\1)\w)\2\1/
  const regex_2 = /((\w)((?!\2).)\2(?!([^\[]*\]))).*(\[\w*\3\2\3\w*\])|(\[\w*(\w)((?!\7).)\7\w*\]).*(\8\7\8(?!([^\[]*\])))/
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var puzzle_1 = () =>
    input.reduce((acc, value) =>
      (!regex_1_bracket.exec(value) && regex_1.exec(value)) ? acc+1 : acc
    , 0)

  var puzzle_2 = () =>
    input.reduce((acc, value) => regex_2.exec(value) ? acc+1 : acc, 0);

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
