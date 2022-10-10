const functions = require('./methods.js');

const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';
const ruta3 = './example/index.html';
const ruta4 = './example/readmeVacio.md';
const rutaAbsEmphy = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
const rutaMd = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md';
const rutaDir = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example';


function mdLinks(path, options) {
  const promiseMdLinks = new Promise((resolve, reject) => {
    if ( !functions.pathExists(path)) {
      reject('La ruta no existe');
    }
    if(!functions.pathAbsolute(path)) {
      path = functions.relativeToAbsolute(path);
    }

    let arrFiles = []; // array para los archivos

    if(functions.isDirectory(path)) { // si no es un directorio agrega el path a un array;
      const arrFileDir = functions.contentDir(path); // array con el contenido del directorio
      console.log('este es el contenido del directorio', arrFileDir);
      arrFiles.push(arrFileDir);
    }
    if(functions.isFile(path)) {
      arrFiles.push(path);
    }
    
    if(arrFiles.length === 0){
      reject('La ruta ingresada no contiene ningun archivo .md'); //
    }
    arrFiles = arrFiles.flat();
    const mdFiles = arrFiles.filter((files) => functions.mdExtension(files));
    
    console.log('---------');
    console.log('este es md ->', mdFiles);

    mdFiles.forEach((fileMd) => {
      if(!functions.mdExtension(fileMd)) {
        reject('No es un archivo .md');
      }
      const contentFile = functions.readFile(fileMd);
      const arrayLinks = functions.saveArrayLinks(contentFile);
      // console.log(arrayLinks);
      const objLinks = functions.objecLinks(arrayLinks, fileMd);
      const statusPrommise = functions.statusHTTP(objLinks);
      if(options.validate){
        resolve(statusPrommise);
      } else{
        resolve(objLinks);
      }
    });
    // console.log('este es md ->', arrFiles);

    // console.log('arrFiles despues de leer el directorio',arrFiles.length);
    // for (let i = 0; i < mdFiles.length; i++) {
    //   const pathNewFile = mdFiles[i];
    //   // console.log('Ingresa al for', pathNewFile);

    //   // console.log(functions.mdExtension(pathNewFile));
    //   // console.log('este es', pathNewFile);

    //   if(!functions.mdExtension(pathNewFile)){
    //     reject('No es un archivo .md');
    //   }
    //   console.log('ingresa aqui');
    //   const contentFile = functions.readFile(pathNewFile);
    //   const arrayLinks = functions.saveArrayLinks(contentFile);
    //   // console.log(arrayLinks);
    //   const objLinks = functions.objecLinks(arrayLinks, pathNewFile);
    //   const statusPrommise = functions.statusHTTP(objLinks);
    //   if(options.validate){
    //     resolve(statusPrommise);
    //   } else{
    //     resolve(objLinks);
    //   }
      
    // }
  });
  return promiseMdLinks;
}



mdLinks(rutaDir, {validate: true})
  .then((res) => {
    console.log('promesa: ', res);
  })
  .catch((err) => {
    console.log('err: ', err);
  });

// console.log(functions.contentDir(rutaAbsoluta));

module.exports = {
  mdLinks,
};