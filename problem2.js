/*
  problem2.js

  Solution to the first problem in the interview process

  Given an array of integers [2, 1, 2, 101, 4, 95, 3, 250, 4, 1, 2, 2, 7, 98, 123, 99, ...]
  Write a function to print the following tabular output that resembles a histogram
  (your output should closely match the sample output below, including "99+" to capture the count for all numbers > 99):
   Num | count
     1 | xx
     2 | xxxx
     3 | x
     4 | xx
      ...
    98 | x
    99 | x
   99+ | xxx
*/

module.exports = function (array) {
  var countArray = [];

  // calculate histogram
  for(var i = 0; i < array.length; i++) {
    if(countArray[array[i]] != null) { // has a value
      countArray[array[i]]++;
    } else {
      // define this index
      countArray[array[i]] = 1;
    }
  }

  // define build histogram string aux function
  this.buildOutputHistogram = function() {
    var os = "Num | count\n";

    var over99Count = 0;

    // Reuse our problem1 solution module to reduce redundant code
    var problem1 = require('./problem1');
    var noDups   = problem1(array).getNoDups();

     for(var i = 0; i < noDups.length; i++) {
       if(noDups[i] > 99) { // special condition, all values above 99 are collected
         over99Count++;
       } else {
         var valStr = '' + noDups[i];
         var xStr = Array(countArray[noDups[i]] + 1).join('x');
         os += "" + valStr + " | " + xStr + "\n";
       }
     }

     // print the special case if it exists
     if(over99Count > 0) {
       os += "99+ | " + (Array(over99Count + 1).join('x')) + "\n";
     }

     return os;
  }

  // define print histogram function
  // Redefined so we can add color to the output
  this.printHistogram = function() {
    var chalk   = require('chalk'); // Let's make our output colorful

    console.log(chalk.blue("Num | count"));

    var over99Count = 0;
    //var keys = Object.keys(countArray);

    // Reuse our problem1 solution module to reduce redundant code
    var problem1 = require('./problem1');
    var noDups   = problem1(array).getNoDups();

     for(var i = 0; i < noDups.length; i++) {
       if(noDups[i] > 99) { // special condition, all values above 99 are collected
         over99Count++;
       } else {
         var valStr = '' + noDups[i];
         var xStr = Array(countArray[noDups[i]] + 1).join('x');
         console.log("%s | " + chalk.red("%s"), valStr, xStr);
       }
     }

     // print the special case if it exists
     if(over99Count > 0) {
       console.log("%s | %s", "99+", chalk.red(Array(over99Count + 1).join('x')));
     }
  }
  
  // define output histogram function
  this.outputHistogram = function(filename) {
    var fs = require('fs'); // fs utility used to write files to disk
    var chalk   = require('chalk'); // Let's make our output colorful

    // Build output string
    var outputString = buildOutputHistogram();

    fs.writeFile(filename, outputString, function(err) {
      if(err) {
        return console.log(err);
      }

      var stats = fs.statSync(filename);
      var fileSizeInBytes = stats.size;

      console.log(chalk.yellow("File %s written. %s bytes on disk."), filename, fileSizeInBytes);
    });
  }

  return this;
};
