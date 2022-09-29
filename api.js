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
const rutaAbsoluta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
const rutaAbs1 = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md';



function mdLinks(path) { //, { validate: false, stats: false }) {
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
    // resolve('convierte tu ruta a absoluta');
    // reject('Message: La ruta no existe');
    console.log(new String(validatePath).valueOf());
    console.log(new String(path).valueOf());
  });
  // console.log(promiseMdLinks);
  return promiseMdLinks;
}

mdLinks(ruta)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

