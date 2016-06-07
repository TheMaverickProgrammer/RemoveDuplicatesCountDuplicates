/*
  problem1.js

  Solution to the first problem in the interview process

  Given an array of integers [5, 1, 2, 6, 1, 9, 2, 6, 5, 8, 12, 5, 19, 7, 8, ...]
  Write a function to return an array without duplicates.
*/

module.exports = function (array) {
  var filter = [],
    noDups = [];

  // Filter the arrays allowing no duplicates
  // by storing it in a js array as the indeces
  for(var i = 0; i < array.length; i++) {
    filter[array[i]] = true;
  }

  // Collect the integer value
  for(var i = 0; i < filter.length; i++) {
    if(filter[i] === true) {
      noDups.push(i);
    }
  }

  // NOTE: Because of the nature of the filter (indices),
  // the result array will also be in incremental order

  this.getNoDups = function() { return noDups; }

  // Print the solution to console
  this.printArray = function() {
    var chalk   = require('chalk');

    console.log(chalk.bold.cyan('Array with no duplicates is:') + ' %s', JSON.stringify(noDups));
  }

  // write solution to file
  this.outputArray = function(filename) {
    var fs = require('fs'); // fs utility used to write files to disk

    fs.writeFile(filename, JSON.stringify(noDups), function(err) {
      if(err) {
        return console.log(err);
      }

      var stats = fs.statSync(filename);
      var fileSizeInBytes = stats.size;

      var chalk   = require('chalk');

      console.log(chalk.yellow("File %s written. %s bytes on disk."), filename, fileSizeInBytes);
    });
  }

  return this;
};
