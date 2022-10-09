const fs = require('fs');
const path = require('path');
const axios = require('axios');
const url = 'https://developer.mozilla.org/es/docs/Web/HTTP/Status';

const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';


function pathExists(pathParams) {
  return fs.existsSync(pathParams);
}

// 'Err: La ruta no existe'
// console.log(pathExists(true));
// console.log(pathExists(ruta2));

function pathAbsolute(pathParams) {
  return path.isAbsolute(pathParams);
}
// 'La ruta es relativa'
// console.log(pathAbsolute(ruta));
// console.log(pathAbsolute(rutaAbsoluta));

function relativeToAbsolute(pathParams) {
  if(typeof pathParams !== 'string') {return `La ruta ingresada no es valida: ${pathParams}`;}
  const convertAbsolute = path.resolve(pathParams);
  return convertAbsolute;
}
// console.log(relativeToAbsolute(123));
// console.log(relativeToAbsolute(123456));

function mdExtension(pathFile) {
  if(typeof pathFile !== 'string') {return `La ruta ingresada no es valida: ${pathFile}`;}
  const extension = path.extname(pathFile);
  if(extension === '.md') {
    return true;
  }
  return false;
}
// 'Err: No es un archivo .md'
// console.log(mdExtension(12345));
// console.log(mdExtension(ruta));

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

// console.log(readFile('./example/archivo.html'));

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
// const arrayLinks = saveArrayLinks(readFile(ruta));

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
  return 'No hay links en el archivo';
}
// console.log(objecLinks(arrayLinks, ruta));


// Peticiones HTTP fetch 
// fetch(url)
//   .then((response) => {
//     console.log(response.status); 
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Peticiones HTTP axios
let objEjemplo = [{
  text: 'Códigos de estado de respuesta HTTP - MDN',
  href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
  file: './example/exampleFile.md'
},
{
  text: 'Node.js file system - Documentación oficial',
  href: 'https://nodejs.org/api/fs.html',
  file: './example/exampleFile.md'
},
{
  text: 'Node.js http.get - Documentación oficial',
  href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
  file: './example/exampleFile.md'
}];
// let pruebaLinks = saveLinks('README.md');
// console.log(pruebaLinks);
// console.log(objEjemplo.href);

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


let objEjemplo2 = [{
  text: 'Códigos de estado de respuesta HTTP - MDN',
  href: 'https://developer.mozilla.org/esss/docs/Web/HTTP/Status',
  file: './example/exampleFile.md',
  status: 404,
  message: 'Fail'
},
{
  text: 'Códigos de estado de respuesta HTTP - MDN',
  href: 'https://developer.mozilla.org/esss/docs/Web/HTTP/Status',
  file: './example/exampleFile.md',
  status: 404,
  message: 'Fail'
},
{
  text: 'Node.js file system - Documentación oficial',
  href: 'https://nodejs.org/api/fs.html',
  file: './example/exampleFile.md',
  status: 200,
  message: 'OK'
},
{
  text: 'Node.js file system - Documentación oficial',
  href: 'https://nodejs.org/api/fs.html',
  file: './example/exampleFile.md',
  status: 200,
  message: 'OK'
},
{
  text: 'Node.js http.get - Documentación oficial',
  href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
  file: './example/exampleFile.md',
  status: 200,
  message: 'OK'
},
{
  text: 'Node.js http.get - Documentación oficial',
  href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
  file: './example/exampleFile.md',
  status: 200,
  message: 'OK'
}];


function statsUnique(arrayLinks) {
  const total = arrayLinks.length;
  const hrefLinks = arrayLinks.map((obj) => obj.href);
  // console.log(hrefLinks)
  const unique = hrefLinks.filter((obj, index) => hrefLinks.indexOf(obj) === index);
  // arrayLinks.forEach(objLinks => {
  //   if (objLinks.status === 'OK') {
  // filtrar los ok
  // }
  return {
    total: total,
    unique: unique.length
  };
  // });
}
// console.log(statsUnique(objEjemplo2));


function statsBroken(arrayLinks) {
  const broken = arrayLinks.filter((obj) => obj.message === 'Fail');
  return {
    broken: broken.length
  };
}

// console.log(statsBroken(objEjemplo2));
const rutaAbs1 = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md';
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

// contentDir(rutaAbs2);
console.log(contentDir(rutaAbs2));





// identificar caso base
// identificar el caso recursivo
// laa declaraciones de mi funcion conducen al caso base

















// const dirRead = fs.readdirSync(pathFile, 'utf-8');
  
// const newArrDir = dirRead.map((dir) => path.join(pathFile, dir));

// const arrArchivo = [];
// const arrDirectorie = [];
// for(let i=0; i<newArrDir.length; i++){
//   if(fs.statSync(newArrDir[i]).isDirectory()){
//     arrDirectorie.push(newArrDir[i]);

//   } else {
//     arrArchivo.push(newArrDir[i]);
//   }
// }
// return [arrArchivo, arrDirectory];
// return arrArchivo;






function isDirectory(path) {
  return fs.statSync(path).isDirectory(); 
}

function isFile(path) {
  return fs.statSync(path).isFile();  
}

// console.log(isFile(ruta));

function readDirectory(pathFile) {
  const dirRead = fs.readdirSync(pathFile, 'utf-8');
  const newArrDir = dirRead.map((dir) => path.join(pathFile, dir));
  return newArrDir;
}

// console.log(readDirectory(rutaAbs1));

// const arrDirAndFile = contentDir(rutaAbs1);
// const arrayArchivos = arrDirAndFile[0];
// const arrayDirectorio = arrDirAndFile[1];

// console.log(arrayArchivos, arrayDirectorio);


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
  readDirectory
};