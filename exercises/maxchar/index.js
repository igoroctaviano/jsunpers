// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  let sumHash = {};
  let maxChar = str[0];

  for (char of str) {
    sumHash[char] = sumHash[char] + 1 || 1;
    if (sumHash[char] > sumHash[maxChar]) {
      maxChar = char;
    }
  }

  return maxChar;
}

module.exports = maxChar;
