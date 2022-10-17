#!/usr/bin/env node

const {mdLinks} = require('./index.js');
const chalk = require('chalk');


const route = process.argv[2];
const argv = process.argv;

const options = {validate: argv.includes('--validate'), stats: argv.includes('--stats')};


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
      resArrPromise.forEach(objLinks => {
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
      resArrPromise.forEach(objLinks => {
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
      // console.log(resArrPromise);
      console.log(chalk.cyan(`
      ◈◇◈◇◈◇◈◇ Links --stats ◈◇◈◇◈◇◈◇◈

      Total: ${resArrPromise.total}
      Unique: ${resArrPromise.unique}
      `));
    })
    .catch((err) => {
      console.log(chalk.red(`
      err: ${err}`));
    });
}else if(argv.length === 5 && argv.includes('--stats') && argv.includes('--validate')) {
  mdLinks(route, options)
    .then((resArrPromise) => {
      console.log(chalk.cyan(`
      ◈◇◈◇◈◇◈◇ Links --stats --validate ◈◇◈◇◈◇◈◇◈

      Total: ${resArrPromise.total}
      Unique: ${resArrPromise.unique}
      Broken: ${resArrPromise.broken}
      `));
    })
    .catch((err) => {
      console.log(chalk.red(`
      err: ${err}`));
    });
} else {
  console.log(chalk.green('Comando no valido'));
}