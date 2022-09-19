const fs = require('fs');

const ruta = './example/exampleFile.md';
const ruta2 = '../img/img.jpg';


function pathExists(pathParams) {
  const pathExists = fs.existsSync(pathParams);
  if(pathExists) {
    return pathParams;
  }
  return 'Err: La ruta no existe';
}
console.log(pathExists(ruta));
console.log(pathExists(ruta2));


