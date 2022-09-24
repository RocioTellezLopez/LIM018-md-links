const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');
const axios = require('axios');
const url = 'https://developer.mozilla.org/es/docs/Web/HTTP/Status';

const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';


function pathExists(pathParams) {
  const pathExists = fs.existsSync(pathParams);
  if(pathExists) {
    return pathParams;
  }
  return 'Err: La ruta no existe';
}
// console.log(pathExists(ruta));
// console.log(pathExists(ruta2));

function pathAbsolute(pathParams) {
  const isAbsolute = path.isAbsolute(pathParams);
  if(isAbsolute) {
    return pathParams;
  }
  // const relativeToAbsolute = path.resolve(pathParams);
  // return relativeToAbsolute;
  return 'La ruta es relativa';
}
// console.log(pathAbsolute(ruta));
// console.log(pathAbsolute(rutaAbsoluta));

function relativeToAbsolute(pathParams) {
  if(typeof pathParams === 'number') {return `La ruta ingresada no es valida: ${pathParams}`;}
  const convertAbsolute = path.resolve(pathParams);
  return convertAbsolute;
}
// console.log(relativeToAbsolute(ruta));
// console.log(relativeToAbsolute(123456));

function mdExtension(pathFile) {
  if(typeof pathFile === 'number') {return `La ruta ingresada no es valida: ${pathFile}`;}
  const extension = path.extname(pathFile);
  if(extension === '.md') {
    return extension;
  }
  return 'Err: No es un archivo .md';
}
// console.log(mdExtension(12345));
// console.log(mdExtension(ruta));

function readFile(pathFile) {
  try{
    const file = fs.readFileSync(pathFile, 'utf8');
    return file;
  }
  catch (err){
    return 'Err: No hay nada en el archivo';
  }
}

// console.log(readFile(ruta));

function saveLink(pathFile) {
  const content = readFile(pathFile);
  const regExt = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  const arrayLinks = content.match(regExt);
  const nuevoArray = [];
  if(arrayLinks !== null) {
    for(let i=0; i< arrayLinks.length; i++) {
      const indexCut = arrayLinks[i].indexOf(']');
      const textLink = arrayLinks[i].slice(1,indexCut);
      const urlLink = arrayLinks[i].slice(indexCut+2,-1);
      const objeto = {
        text: textLink,
        href: urlLink,
        file: pathFile
      };
      nuevoArray.push(objeto);
    }
    return nuevoArray;
  }
  return 'No hay links en el archivo';
}
// console.log(saveLink(ruta));


// Peticiones HTTP fetch 
// fetch(url)
//   .then((response) => {
//     console.log(response.status); 
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Peticiones HTTP axios
const objEjemplo = {
  text: 'Códigos de estado de respuesta HTTP - MDN',
  href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
  file: './example/exampleFile.md'
};
console.log(objEjemplo.href);

function statusHTTP(objeto) {
  axios.get(objeto.href)
    .then((response) => {
      const statusCode = response.status;
      const messageCode = response.statusText;
      objeto.status = statusCode;
      objeto.message = messageCode;
      console.log(objeto);
      return objeto;
    })
    .catch((error) => {
      console.log(error);
    });
}

console.log(statusHTTP(objEjemplo));



module.exports = {
  pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension
};