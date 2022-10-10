const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { throws } = require('assert');
const url = 'https://developer.mozilla.org/es/docs/Web/HTTP/Status';

const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';


function pathExists(pathParams) {
  return fs.existsSync(pathParams);
}

function pathAbsolute(pathParams) {
  return path.isAbsolute(pathParams);
}

function relativeToAbsolute(pathParams) {
  if(typeof pathParams !== 'string') {return `La ruta ingresada no es valida: ${pathParams}`;}
  const convertAbsolute = path.resolve(pathParams);
  return convertAbsolute;
}

function mdExtension(pathFile) {
  if(typeof pathFile !== 'string') {return `La ruta ingresada no es valida: ${pathFile}`;}
  const extension = path.extname(pathFile);
  if(extension === '.md') {
    return true;
  }
  return false;
}

// funcion para filtar archivos md
const arrPrueba = [
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\archivo.html',
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md',
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\index.html',
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\readme.txt',
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\readmeVacio.md',
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\dirPrueba\\dirExample\\prueba.md',
  'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md'
];

// console.log(arrPrueba.filter((element) => mdExtension(element)));

function readFile(pathFile) {
  try{
    const file = fs.readFileSync(pathFile, 'utf8');
    if (file.length > 0) {
      return file;
    }
    return 'El archivo esta vacio';
  }
  catch (err){
    return 'Err: No es una ruta valida';
  }
}

function saveArrayLinks(stringContent) {
  try{
    const regExt = /\[(.+)\]\((https?:\/\/.+)\)/gi;
    const arrayLinks = stringContent.match(regExt);
    if(arrayLinks == null){
      return [];
    }
    return arrayLinks;
  }
  catch (err){
    return 'Err: el argumento no es valido';
  }
}

function objecLinks(arrayLinks, path){
  const nuevoArray = [];
  if(arrayLinks.length > 0) {
    for(let i=0; i< arrayLinks.length; i++) {
      const indexCut = arrayLinks[i].indexOf(']');
      const textLink = arrayLinks[i].slice(1,indexCut);
      const urlLink = arrayLinks[i].slice(indexCut + 2, -1);
      const objeto = {
        text: textLink,
        href: urlLink,
        file: path
      };
      nuevoArray.push(objeto);
    }
    return nuevoArray;
  }
  return []; // problema con el map cambio por array []
}

// Peticiones HTTP axios

function statusHTTP(arrayLinks) {
  return Promise.all(arrayLinks.map((objectLinks) => {
    return (axios.get(objectLinks.href)
      .then((response) => {
        const statusCode = response.status;
        const messageCode = response.statusText;
        objectLinks.status = statusCode;
        objectLinks.message = messageCode;
        return objectLinks;
      })
      .catch((error) => {
        if(error.response) {
          objectLinks.status = error.response.status;
          objectLinks.message = 'Fail';
          return objectLinks;
        }
        return error.message;
      })
    );
  }));
}

function statsUnique(arrayLinks) {
  try {
    const total = arrayLinks.length;
    const hrefLinks = arrayLinks.map((obj) => obj.href);
    const unique = hrefLinks.filter((obj, index) => hrefLinks.indexOf(obj) === index);
    return {
      total: total,
      unique: unique.length
    };
  } catch (error) {
    return 'err: El argumento ingresado no es un array.';
  }
}

function statsBroken(arrayLinks) {
  try {
    const broken = arrayLinks.filter((obj) => obj.message === 'Fail');
    return {
      broken: broken.length
    };
  } catch (error) {
    return 'err: El argumento ingresado no es un array.';
  }
  
}

// const rutaAbs1 = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md';
const rutaAbs2 = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example';

function contentDir(path) {
  let arrFile = [];
  let arrDirectories = [];

  const dirRead = readDirectory(path); // array con elcontenido del directorio
  for (let i=0; i<dirRead.length; i++){ // recorro el array
    if(isDirectory(dirRead[i])){ // si es directorio
      arrDirectories.push(dirRead[i]); // almaceno el directorio actual en arrDirectories
    } else{
      arrFile.push(dirRead[i]); // es un archivo y almacena en arrFile
    }
  }
  if(arrDirectories.length > 0) {
    for (let i=0; i<arrDirectories.length; i++){
      arrFile.push(contentDir(arrDirectories[i]));
    }
  } else {
    return arrFile;
  }
  return arrFile.flat();
}

// console.log(contentDir(rutaAbs2));

function isDirectory(path) {
  return fs.statSync(path).isDirectory(); 
}

function isFile(path) {
  return fs.statSync(path).isFile();  
}

function readDirectory(pathFile) {
  const dirRead = fs.readdirSync(pathFile, 'utf-8');
  const newArrDir = dirRead.map((dir) => path.join(pathFile, dir));
  return newArrDir;
}



module.exports = {
  pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension,
  readFile,
  saveArrayLinks,
  objecLinks,
  statusHTTP,
  statsUnique,
  statsBroken,
  isDirectory,
  isFile,
  readDirectory,
  contentDir
};