// --- Directions
// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'

function capitalize(str) {

}

// function capitalize(str) {
//   let capitalize = [];

//   str.split(' ').forEach(word => {
//     word = word.split('');
//     word[0] = word[0].toUpperCase();
//     capitalize.push(word.join(''));
//   });

//   return capitalize.join(' ');
// }

// function capitalize(str) {
//   let capitalized = [];

//   str.split(' ').forEach(word => {
//     capitalized.push(word[0].toUpperCase() + word.slice(1)); // word.slice(1, word.length))
//   });

//   return capitalized.join(' ');
// }

module.exports = capitalize;
