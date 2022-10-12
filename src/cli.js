#!/usr/bin/env node

const {mdLinks} = require('./index.js');
const chalk = require('chalk');


const route = process.argv[2];

const argv = process.argv;

// console.log(argv);
const options = {validate: argv.includes('--validate'), stats: argv.includes('--stats')};

// console.log(options);
// console.log(chalk.blue(`Este es la ruta ingresada: ${route} ${options}`));


mdLinks(route, options)
  .then((resArrPromise) => {
    console.log('promesa: =>', resArrPromise);
    // resArrPromise.forEach(elementPromise => {
    //   elementPromise.then((resPromise) => console.log(resPromise));
      
    // });
  })
  .catch((err) => {
    console.log('err: ', err);
  });
