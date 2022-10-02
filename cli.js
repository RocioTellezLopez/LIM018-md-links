#!/usr/bin/env node

const {mdLinks} = require('./api.js');

// const word = process.argv[2];

// const length = word.length;

// const [,, ...argv] = process.argv;

// console.log(`Words Length ${length}`);

// console.log(`hello: ${argv}`);
const route = process.argv[2];
const validate = process.argv[3];
const stats = process.argv[4];

// console.log(`Este es la ruta ingresada: ${route} ${validate} ${stats}`);

mdLinks(route)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });