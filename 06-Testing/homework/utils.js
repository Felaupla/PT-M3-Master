const express = require("express");
//const { sumArray } = require("|");
const app = express();

// function sumArray(array, n) {
//   for (let i = 0; i < array.length; i++) {
//     for (let j = i + 1; j < array.length; j++) {
//       if (array[i] + array[j] === n) return true;
//     }
//   }
//   return false;
// }
function pluck(array, prop) {
  return array.map((p) => p[prop]);
}

module.exports = { pluck };
