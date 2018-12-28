// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

function anagrams(stringA, stringB) {
 return (
    stringA
      .toLowerCase() // optional
      .split('')
      .sort()
      .join() ==
    stringB
      .toLowerCase() // optional
      .split('')
      .sort()
      .join()
  );
  
  // return sortString(stringA) === sortString(stringB);
}

// function sortString(str) {
//   return str.split('').sort().join('');
// }

// function buildCharMap(str) {
//   let map = {};

//   for (let i = 0; i < str.length; i++) {
//     map[str[i]] = map[str[i]]++ || 1;
//   }

//   return map;
// }

// function anagrams(stringA, stringB) {
//   if (stringA.length !== stringB.length) {
//     return false;
//   }

//   let mapA = buildCharMap(stringA);
//   let mapB = buildCharMap(stringB);

//   for (let prop in mapA) {
//     if (mapA[prop] !== mapB[prop]) {
//       return false;
//     }
//   }

//   return true;
// }

module.exports = anagrams;
