#!/usr/bin/env node

const {mdLinks} = require('./index.js');
const chalk = require('chalk');


const route = process.argv[2];

const argv = process.argv;

// console.log(argv);
const options = {validate: argv.includes('--validate'), stats: argv.includes('--stats')};

const validate = argv.includes('--validate');

console.log(validate);


if(argv.length === 2) {
  console.log(chalk.cyan(`
    ███╗   ███╗██████╗       ██╗     ██╗███╗   ██╗██╗  ██╗███████╗
    ████╗ ████║██╔══██╗      ██║     ██║████╗  ██║██║ ██╔╝██╔════╝
    ██╔████╔██║██║  ██║█████╗██║     ██║██╔██╗ ██║█████╔╝ ███████╗
    ██║╚██╔╝██║██║  ██║╚════╝██║     ██║██║╚██╗██║██╔═██╗ ╚════██║
    ██║ ╚═╝ ██║██████╔╝      ███████╗██║██║ ╚████║██║  ██╗███████║
    ╚═╝     ╚═╝╚═════╝       ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                  
                  ╔════════◈◈◈◈◈◈◈◈════════╗
                      By Rocio Tellez L.    
                  ╚════════◈◈◈◈◈◈◈◈════════╝                                                       
    `));
} else if(argv.length === 3 && argv.includes(route)) {
  mdLinks(route, options)
    .then((resArrPromise) => {
      console.log(resArrPromise);
      const objPromise = resArrPromise.flat();
      objPromise.forEach(objLinks => {
        console.log(chalk.cyan(`
        ◈◇◈◇◈◇◈◇ Links Encontrados ◈◇◈◇◈◇◈◇◈

        Text: ${objLinks.text}
        Href: ${objLinks.href}
        File: ${objLinks.file}
        `));
      });
    })
    .catch((err) => {
      console.log(chalk.red(`
      err: ${err}`));
    });
} else if(argv.length === 4 && argv.includes('--validate')) {
  mdLinks(route, options)
    .then((resArrPromise) => {
      const objPromise = resArrPromise.flat();
      objPromise.forEach(objLinks => {
        console.log(chalk.cyan(`
        ◈◇◈◇◈◇◈◇ Links Encontrados --validate ◈◇◈◇◈◇◈◇◈

        Text: ${objLinks.text}
        Href: ${objLinks.href}
        File: ${objLinks.file}
        Status: ${objLinks.status}
        Message: ${objLinks.message}
        `));
      });
    })
    .catch((err) => {
      console.log(chalk.red(`
      err: ${err}`));
    });
} else if(argv.length === 4 && argv.includes('--stats')) {
  mdLinks(route, options)
    .then((resArrPromise) => {
      const objPromise = resArrPromise.flat();
      objPromise.forEach(objLinks => {
        console.log(chalk.cyan(`
        ◈◇◈◇◈◇◈◇ Links --stats ◈◇◈◇◈◇◈◇◈

        Total: ${objLinks.total}
        Unique: ${objLinks.unique}
        `));
      });
    })
    .catch((err) => {
      console.log(chalk.red(`
      err: ${err}`));
    });
}else if(argv.length === 5 && argv.includes('--stats') && argv.includes('--validate')) {
  mdLinks(route, options)
    .then((resArrPromise) => {
      const objPromise = resArrPromise.flat(); //No aplica flat()
      objPromise.forEach(objLinks => {
        console.log(chalk.cyan(`
        ◈◇◈◇◈◇◈◇ Links --stats --validate ◈◇◈◇◈◇◈◇◈

        Total: ${objLinks.total}
        Unique: ${objLinks.unique}
        Broken: ${objLinks.broken}
        `));
      });
    })
    .catch((err) => {
      console.log(chalk.red(`
      err: ${err}`));
    });
}