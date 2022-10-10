#!/usr/bin/env node

const {mdLinks} = require('./src/api.js');

// const word = process.argv[2];

// const length = word.length;

// const [,, ...argv] = process.argv;

// console.log(`Words Length ${length}`);

// console.log(`hello: ${argv}`);
const route = process.argv[2];
const options = process.argv[3];

// console.log(`Este es la ruta ingresada: ${route} ${validate} ${stats}`);

mdLinks(route, {validate: true} )
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });