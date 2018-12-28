// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  return str.split('').reduce(function(a, b) {
    return b + a;
  });
}

// function reverse(str) {
//   let newStr = '';

//   for (let char of str) {
//     newStr = char + newStr;
//   }

//   return newStr;
// }

// function reverse(str) {
//   let newStr = '';

//   for (let i = str.length; i > 0; i--) {
//     newStr += str[i - 1];
//   }

//   return newStr;
// }

// function reverse(str) {
//   return str.split('').reverse().join('');
// }

module.exports = reverse;
