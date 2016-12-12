var module = (function() {
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()

  function decompress(input) {
    let output = {part1: 0, part2: 0}
    let i = 0
    while (i < input.length) {
      const ch = input[i++]

      if (ch === ' ' || ch === '\n') {
        continue
      }

      if (ch !== '(') {
        output.part1 += 1
        output.part2 += 1
        continue
      }

      let s = i++
      while (input[i++] !== 'x') {}
      const length = parseInt(input.slice(s, i - 1), 10)

      s = i++
      while (input[i++] !== ')') {}
      let count = parseInt(input.slice(s, i - 1), 10)

      var rawData = input.slice(i, i + length)
      var data    = decompress(rawData)
      while (count--) {
        output.part1 += rawData.length
        output.part2 += data.part2
      }

      i += length
    }
    return output
  }

  var puzzle_1 = () =>
    decompress(input).part1


  var puzzle_2 = () =>
    decompress(input).part2

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
