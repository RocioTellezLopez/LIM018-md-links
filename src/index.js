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
      arrFiles.push(arrFileDir);
    }
    if(functions.isFile(path)) {
      arrFiles.push(path);
    }
    
    arrFiles = arrFiles.flat();

    const mdFiles = arrFiles.filter((files) => functions.mdExtension(files)); // array con archivos .md
    
    if(mdFiles.length === 0){
      reject('La ruta ingresada no contiene ningun archivo .md'); //
    }

    let arrObjetos = [];
    const promesasPendientes = [];

    mdFiles.forEach((fileMd) => {
      const contentFile = functions.readFile(fileMd);
      const arrayLinks = functions.saveArrayLinks(contentFile);

      const objLinks = functions.objecLinks(arrayLinks, fileMd);
      arrObjetos.push(objLinks);

      const statusPrommise = functions.statusHTTP(objLinks);
      promesasPendientes.push(statusPrommise);

    });
    
    arrObjetos = arrObjetos.flat();
    const arrProm = Promise.all(promesasPendientes); // convierto mi array de promesas pendiente en una sola promesa 
    const statsUnique = functions.statsUnique(arrObjetos);

    if(options.validate && !options.stats){
      arrProm.then((res) => resolve(res.flat()));

    } else if(options.stats && !options.validate){
      resolve(statsUnique);

    } else if (options.stats && options.validate) {
      arrProm.then((res) => {
        const statsBroken = functions.statsBroken(res.flat());
        const uniqueBroken = statsUnique;
        uniqueBroken.broken = statsBroken.broken;

        resolve(uniqueBroken);
      });
    }
    else{
      resolve(arrObjetos);
    }

  });
  return promiseMdLinks;
}



// mdLinks(rutaDir, {validate: true, stats: true})
//   .then((res) => {
//     console.log('promesa: =>', res);
//     // res.forEach(elementPromise => {
//     //   elementPromise.then((resPromise) => console.log(resPromise));
      
//     // });
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   });

module.exports = {
  mdLinks,
};