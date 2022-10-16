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
      // console.log('este es el contenido del directorio', arrFileDir);
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
    // console.log('---------');
    // console.log('este es md ->', mdFiles);
    const arrObjetos = [];
    const arrStatsUnique = [];
    const arrStatsBroquen = []; //
    const promesasPendientes = [];

    mdFiles.forEach((fileMd) => {
      const contentFile = functions.readFile(fileMd);
      const arrayLinks = functions.saveArrayLinks(contentFile);
      // console.log(arrayLinks);
      const objLinks = functions.objecLinks(arrayLinks, fileMd);
      // console.log('objetos dentro de for', objLinks);
      const statusPrommise = functions.statusHTTP(objLinks); //.then((res) => console.log('promesas de status', res));
      
      promesasPendientes.push(statusPrommise);


      const linksUnique = functions.statsUnique(objLinks);
      arrStatsUnique.push(linksUnique);
      
      arrObjetos.push(objLinks);
    });
    
    const arrProm = Promise.all(promesasPendientes); // convierto mi array de promesas pendiente en una sola promesa 

    if(options.validate && !options.stats){

      arrProm.then((res) => resolve(res));

    } else if(options.stats && !options.validate){
      resolve(arrStatsUnique);

    } else if (options.stats && options.validate) {
      arrProm.then((res) => {
        const arrBrok = [];
        res.forEach((resElem) => {
          // console.log(resElem);
          const broken = functions.statsBroken(resElem);
          arrBrok.push(broken);
          
        });
        const statsBroken = arrStatsUnique;

        for (let i = 0; i < statsBroken.length; i++) {
          statsBroken[i].broken = arrBrok[i].broken;
        }
        resolve(statsBroken);
      });
      // resolve([arrStatsUnique, arrStatsBroquen]); // obtener los links broken del array de promesas

      // resolve('En construcción ...')
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


// console.log(functions.contentDir(rutaAbsoluta));

// console.log(arr1)

module.exports = {
  mdLinks,
};