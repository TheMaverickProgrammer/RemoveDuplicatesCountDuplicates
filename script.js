#!/usr/bin/env node

/*
Author: Maverick Peppers
Date: 6/07/16
Description:
  Solve a selected problem set.
  Optionally enter your own problem set using -a
  Optionally save the solutions set to file using -o
*/

var program = require('commander');
var chalk   = require('chalk'); // Let's make our output colorful

/*
  Use commander to generate and listen for flags
  Commander, by default also adds a -h --help flag
  */
program
  .arguments('<problem>')
  .option('-o, --output <output filename>', 'save program output as a text file')
  .option('-a, --array <comma seperated array list>', 'e.g.: 5,6,23,5,90,.... If no array list is provided, a default one will be used.')
  .action(function(problem) {
      console.log('executing %s...', problem);

      // If the user doesn't supply an array, use a hard coded array
      var defaultArray = [5, 1, 2, 600, 100, 9, 2, 22, 6, 99, 99, 8, 12, 50, 19, 7, 8];

      // Switch problem execution based on user input
      if(problem === "problem1") {
        var problem1 = require('./problem1');
        var solution = null;

        if(program.array == null) { // array not supplied
          console.log(chalk.green("No array supplied. Using hard coded array."));
          solution = problem1(defaultArray);
        } else {
          // array result is actually type string
          // we split the commas and return an array of integers
          // NOTE: if characters and strings are also supplied, they will be completely ignored
          //       due to filtering method in problem1
          solution = problem1(program.array.split(','));
        }

        // show the result to the user
        solution.printArray();

        if(program.output != null) { // output filename supplied
          solution.outputArray(program.output);
        }
      } else if(problem === "problem2") {
        var problem2 = require('./problem2');
        var solution = null;

        if(program.array == null) { // array not supplied
          console.log(chalk.green("No array supplied. Using hard coded array."));
          solution = problem2(defaultArray);
        } else {
          // array result is actually type string
          // we split the commas and return an array of integers
          // NOTE: if characters and strings are also supplied, they will be completely ignored
          //       due the filtering method in problem2
          solution = problem2(program.array.split(','));
        }

        // show the result to the user
        solution.printHistogram();

        if(program.output != null) { // output filename supplied
          solution.outputHistogram(program.output);
        }
      } else { // No user option available, let the user know
        console.error(chalk.red("No problem called \'%s\' exists. Aborting."), problem);
        console.log("Please enter either \'problem1\' or \'problem2\'");
      }
  })
  .parse(process.argv); // finally, parse the command line arguments

  // catch any empty arguments
  if(process.argv[2] == null) { // no problem selected
    console.error(chalk.red("No problem selected. Use -h or --help for manual."));
  }
