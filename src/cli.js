#!/usr/bin/env node

const {mdLinks} = require('./index.js');
const chalk = require('chalk');


const route = process.argv[2];

const argv = process.argv;

// console.log(argv);
const options = {validate: argv.includes('--validate'), stats: argv.includes('--stats')};



if(argv.length === 2) {
  console.log(`
    ███╗   ███╗██████╗       ██╗     ██╗███╗   ██╗██╗  ██╗███████╗
    ████╗ ████║██╔══██╗      ██║     ██║████╗  ██║██║ ██╔╝██╔════╝
    ██╔████╔██║██║  ██║█████╗██║     ██║██╔██╗ ██║█████╔╝ ███████╗
    ██║╚██╔╝██║██║  ██║╚════╝██║     ██║██║╚██╗██║██╔═██╗ ╚════██║
    ██║ ╚═╝ ██║██████╔╝      ███████╗██║██║ ╚████║██║  ██╗███████║
    ╚═╝     ╚═╝╚═════╝       ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                                                                  
    `);

}

if(argv.length === 3 && argv.includes(route)) {
  mdLinks(route, options)
    .then((resArrPromise) => {
    
      // console.log('promesa: =>', resArrPromise.flat());
      const objPromise = resArrPromise.flat();
      
      console.log('◈◇◈◇◈◇◈◇ MD-LINKS by Rocio Tellez ◈◇◈◇◈◇◈◇◈');

      objPromise.forEach(objLinks => {
        console.log('◈◇◈◇◈◇◈◇ Links Encontrados ◈◇◈◇◈◇◈◇◈');

        console.log(chalk.blue('Text:'), objLinks.text);
        console.log(chalk.blue('Href:'), objLinks.href);
        console.log(chalk.blue('File:'), objLinks.file);

        // console.log(objLinks);

      });
      // resArrPromise.forEach(elementPromise => {
      //   elementPromise.then((resPromise) => console.log(resPromise));
      
    // });
    })
    .catch((err) => {
      console.log('err: ', err);
    });
}
  
// console.log(options);
// console.log(chalk.blue(`Este es la ruta ingresada: ${route} ${options}`));

// inicio 



// mdLinks(route, options)
//   .then((resArrPromise) => {
    
//     console.log('promesa: =>', resArrPromise);
//     // resArrPromise.forEach(elementPromise => {
//     //   elementPromise.then((resPromise) => console.log(resPromise));
      
//     // });
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   });
