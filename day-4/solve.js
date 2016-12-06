var fs = require('fs');
require('../support');

Array.prototype.sort_by_count_then_name = function() {
  return this.sort(function(a,b){
    if(a.count > b.count) {
      return -1;
    }
    if(a.count < b.count) {
      return 1;
    }
    if(a.count == b.count && a.key > b.key) {
      return 1;
    }
    if(a.count == b.count && a.key < b.key) {
      return -1;
    }
    return 0;
  });
};

var module = (function() {
  const regex = /^([A-Za-z-]*)-(\d+)\[(.+)\]/;
  const abc   = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const input = fs.readFileSync('./input.txt')
    .toString()
    .trim()
    .split('\n')

  var get_regex_matches = (str) => regex.exec(str)

  var character_array_to_count_object = (array) =>
    array.reduce((acc, value) =>
      Object.assign(
        acc,
        { [value] : (value in acc) ? acc[value]+1 : 1 }
      )
    , {});

  var do_calculation = (value, acc) => {
    var matches = get_regex_matches(value)
    var chars_object = matches[1].replace(/-/g, '')
      .split('')
      .andThen(
        (characters) => character_array_to_count_object(characters)
      )

    var ordered = Object.keys(chars_object)
      .sort()
      .reduce((acc, key) => [ ...acc, {key: key, count: chars_object[key]}], []);


    var expected_key_match = ordered
      .sort_by_count_then_name()
      .map((obj) => obj.key)
      .join('')
      .substr(0,5)

    if(expected_key_match == matches[3]) {
      return Object.assign({}, {
          keys: acc.keys.concat(value),
          sector_ids: acc.sector_ids.concat(parseInt(matches[2])),
          count: acc.count + parseInt(matches[2])
        });
    }

    return acc;
  }

  var without_decoy_data = () =>
    input.reduce(
      (acc, value) => do_calculation(value, acc), {keys: [], sector_ids: [], count: 0}
    );

  var shift_cipher_calculator = (matches, value) => {
    if(value == '-'){
      new_letter = ' ';
    } else {
      new_position = (abc.indexOf(value) + parseInt(matches[2])) % 26
      new_letter   = abc[new_position];
    }
    return new_letter;
  }

  var shift_cipher = (str) => {
    var matches = get_regex_matches(str)

    return matches[1]
      .split('')
      .reduce((acc, value) => [...acc, shift_cipher_calculator(matches, value)], [])
      .join('');
  }

  var puzzle_1 = () =>
    without_decoy_data().count

  var puzzle_2 = () =>
    without_decoy_data().keys
      .map((key) => shift_cipher(key))
      .map((value, index) => value.includes('north') ? without_decoy_data().sector_ids[index] : null)
      .join('');

  var run = () => {
    console.log("Puzzle 1: " + puzzle_1());
    console.log("Puzzle 2: " + puzzle_2());
  }

  return {
    run: run
  }
})();
