const functions = require('./index.js');

const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';
const ruta3 = './example/index.html';
const ruta4 = './example/readmeVacio.md';
const rutaAbsoluta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
const rutaAbs1 = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md';



function mdLinks(path, options) {
  const promiseMdLinks = new Promise((resolve, reject) => {
    if ( !functions.pathExists(path)) {
      reject('La ruta no existe');
    }
    if(!functions.pathAbsolute(path)) {
      path = functions.relativeToAbsolute(path);
    }

    const arrArchivo = [];
    const arrDirectorie = [];

    if(functions.isDirectory(path)){
      const dirRead = functions.readDirectory(path); // array con elcontenido del directorio
      
      for (let i=0; i<dirRead.length; i++){
        if(functions.isDirectory(dirRead[i])){
          arrDirectorie.push(dirRead[i]);
        } else{
          arrArchivo.push(dirRead[i]);
        }
      }
    }
    if(!functions.mdExtension(path)){

      reject('No es un archivo .md');
    }
    const contentFile = functions.readFile(path);
    const arrayLinks = functions.saveArrayLinks(contentFile);
    const objLinks = functions.objecLinks(arrayLinks, path);
    const statusPrommise = functions.statusHTTP(objLinks);
    if(options.validate){
      resolve(statusPrommise);
    }
    resolve(objLinks);
  });
  return promiseMdLinks;
}



// mdLinks(ruta, {validate: true})
//   .then((res) => {
//     console.log('promesa: ', res);
//   })
//   .catch((err) => {
//     console.log('erro ', err);
//   });



module.exports = {
  mdLinks,
};