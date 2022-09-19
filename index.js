const fs = require('fs');
const path = require('path');

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
console.log(pathExists(ruta));
console.log(pathExists(ruta2));

function pathAbsolute(pathParams) {
  const isAbsolute = path.isAbsolute(pathParams);
  if(isAbsolute) {
    return pathParams;
  }
  // const relativeToAbsolute = path.resolve(pathParams);
  // return relativeToAbsolute;
  return 'La ruta es relativa';
}
console.log(pathAbsolute(ruta));
console.log(pathAbsolute(rutaAbsoluta));

function relativeToAbsolute(pathParams) {
  const convertAbsolute = path.resolve(pathParams);
  return convertAbsolute;
}
console.log(relativeToAbsolute(ruta));

function mdExtension(pathFile) {
  const extension = path.extname(pathFile);
  if(extension === '.md') {
    return extension;
  }
  return 'Err: No es un archivo .md';
}
console.log(mdExtension(ruta2));


module.exports = {
  pathExists
};