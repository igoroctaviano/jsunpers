// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

function chunk(array, size) {

}

// function chunk(array, size) {
//   let chunked = [];

//   for (let element of array) {
//     let chunk = chunked[chunked.length - 1];

//     if (!chunk || chunk.length === size) {
//       chunked.push([element]);
//     } else {
//       chunk.push(element);
//     }
//   }

//   return chunked;
// }

// function chunk(array, size) {
//   let chunk = [];
//   let chunks = [];

//   for (let i = 0; i < array.length; i++) {
//     if (chunk.length < size - 1) {
//       chunk.push(array[i]);
//     } else {
//       chunk.push(array[i]);
//       chunks.push(chunk);
//       chunk = [];
//     }
//   }

//   if (chunk.length > 0) {
//     chunks.push(chunk);
//   }

//   return chunks;
// }

// function chunk(array, size) {
//   let chunks = [];

//   while(array.length > size) {
//     chunks.push(array.splice(0, size));
//   }

//   if (array.length > 0) {
//     chunks.push(array);
//   }

//   return chunks;
// }

module.exports = chunk;
