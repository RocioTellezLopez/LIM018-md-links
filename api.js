const functions = require('./index.js');

// function mdLinks(path) { //, { validate: false, stats: false }) {
//   const promiseMdLinks = new Promise((resolve, reject) => {
//     let pathValidate = '';
//     if(functions.pathExists(path)) {
//       pathValidate = path;
//       if(functions.pathAbsolute(path)) {
//         pathValidate = path;
//         // resolve('hola mundo');
//       } else if{
//         pathValidate = functions.relativeToAbsolute(path);
//       }
//     } else {
//       reject('La ruta no existe');
//     }
//     reject('hola');
//   });
//     // console.log(promiseMdLinks);
//   return promiseMdLinks;
// }
const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';
const ruta3 = './example/index.html';
const ruta4 = './example/readmeVacio.md';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
const rutaAbs1 = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md';



function mdLinks(path, options = { validate: false, stats: false }) {
  const promiseMdLinks = new Promise((resolve, reject) => {
    if ( !functions.pathExists(path)) {
      reject('La ruta no existe');
    } 
    if(!functions.pathAbsolute(path)) {// retorna -> path || mensaje
      path = functions.relativeToAbsolute(path);
    }
    if(!functions.mdExtension(path)){
      reject('No es un archivo .md');
    }
    const contentFile = functions.readFile(path);
    const arrayLinks = functions.saveArrayLinks(contentFile);
    const objLinks = functions.objecLinks(arrayLinks, path);
    const statusPrommise = functions.statusHTTP(objLinks);
    const uniqueLinks = functions.statsUnique(objLinks);
    const brokenLinks = functions.statsBroken(objLinks);
    if(options.validate && options.stats == false){
      resolve(statusPrommise);
    }
    if(options.stats && options.validate == false){
      resolve(uniqueLinks);
    }
    if(options.stats && options.validate){
      // resolve(uniqueLinks);
      resolve(`${uniqueLinks}
      ${brokenLinks}`);
    }
    resolve(objLinks);
  });
  return promiseMdLinks;
}

mdLinks(ruta, { validate: true, stats: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
