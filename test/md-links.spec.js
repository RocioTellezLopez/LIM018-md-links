// const mdLinks = require('../');
const { pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension,
  readFile, 
  saveArrayLinks,
  objecLinks} = require('../index.js');

// describe('mdLinks', () => {
//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

describe('pathExists', () => {
  it('deberia de ser una función', () => {
    expect(typeof pathExists).toBe('function');
  });
  it('deberia retornar true si la ruta existe', () => {
    const path = './example/exampleFile.md';
    const truePath = pathExists(path);
    expect(truePath).toBeTruthy();
  });
  it('deberia retornar false si la ruta no existe', () => {
    const path = './example.md';
    const falsePath = pathExists(path);
    expect(falsePath).toBeFalsy();
  });
  it('deberia retornar false si la ruta ingresada es no es correcta', () => {
    const path = 'example.md';
    const pathString = pathExists(path);
    expect(pathString).toBe(false);
  });
});

describe('pathAbsolute', () => {
  it('deberia de ser una función', () => {
    expect(typeof pathAbsolute).toBe('function');
  });
  it('deberia retornar true si la ruta es absoluta', () => {
    const path = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
    const isAbsolute = pathAbsolute(path);
    expect(isAbsolute).toBeTruthy();
  });
  it('deberia retornar false si la ruta es relativa', () => {
    const path = '../example/index.html';
    const isRelative = pathAbsolute(path);
    expect(isRelative).toBeFalsy();
    expect(pathAbsolute('')).toBeFalsy();
  });
});

describe('relativeToAbsolute', () => {
  it('deberia de ser una función', () => {
    expect(typeof relativeToAbsolute).toBe('function');
  });
  it('deberia convertir la ruta relativa a ruta absoluta', () => {
    const path = './example/exampleFile.md';
    const convertToAbsolute = relativeToAbsolute(path);
    expect(convertToAbsolute).toBe('C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md');
  });
  it('deberia retornar ruta no valida si se ingresa una ruta que no es un string', () => {
    const path = 12345;
    const convertToAbsolute = relativeToAbsolute(path);
    expect(convertToAbsolute).toBe(`La ruta ingresada no es valida: ${path}`);
  });
});

describe('mdExtension', () => {
  it('deberia de retornar true si la extension del archivo es .md', () => {
    const path = 'exampleFile.md';
    const mdExt = mdExtension(path);
    expect(mdExt).toBeTruthy();
  });
  it('deberia de retornar false si la extensión de el archivo no es .md', () => {
    const path = 'index.html';
    const htmlExt = mdExtension(path);
    expect(htmlExt).toBeFalsy();
  });
  it('deberia de retornar un mensaje indicando que la ruta no es valida si la ruta no es un string', () => {
    const path = 123456;
    const htmlExt = mdExtension(path);
    expect(htmlExt).toBe(`La ruta ingresada no es valida: ${path}`);
  });
});

describe('readFile', () => {
  it('deberia de retornar el contenido del archivo', () => {
    const stringContent = `El comportamiento por defecto no debe validar si las URLs responden ok o no,
    solo debe identificar el archivo markdown (a partir de la ruta que recibe como
    argumento), analizar el archivo Markdown e imprimir los links que vaya
    encontrando, junto con la ruta del archivo donde aparece y el texto
    que hay dentro del link (truncado a 50 caracteres).
    [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
    [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
    [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)`;
    const path = './example/exampleFile.md';
    const content = readFile(path);
    expect(content).toContain('Códigos de estado de respuesta HTTP');
  });
  it('deberia de retornar mensaje si el archivo esta vacio', () => {
    const path = './example/readmeVacio.md';
    const content = readFile(path);
    expect(content).toBe('El archivo esta vacio');
  });
  it('deberia de retornar mensaje de error si la ruta ingresada no es un string', () => {
    const path = 123456;
    const errPath = readFile(path);
    expect(errPath).toBe('Err: No es una ruta valida');
  });
});

describe('saveArrayLinks', () => {
  it('deberia de retornar un array con los links encontrados', () => {
    const stringContent = `El comportamiento por defecto no debe validar si las URLs responden ok o no,
    solo debe identificar el archivo markdown (a partir de la ruta que recibe como
    argumento).
    [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
    [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)`;
    const arrLinks = saveArrayLinks(stringContent);
    const arrResult = ['[Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)', '[Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)'];
    expect(arrLinks).toEqual(arrResult);
  });
  it('deberia de retornar un array vacio si se ingresa un string vacio o sin links', () => {
    const content = 'este es un texto sin links';
    const content1 = '';
    const arrResult = saveArrayLinks(content);
    const arrResult1 = saveArrayLinks(content1);
    expect(arrResult).toEqual([]);
    expect(arrResult1).toEqual([]);
  });
  it('deberia de retornar mensaje de error si el argumento no es un string', () => {
    const contentNum = 123456;
    const resultError = saveArrayLinks(contentNum);
    expect(resultError).toBe('Err: el argumento no es valido');
  });
});

describe('objectLinks', () =>{
  it('deberia de retornar un array con objetos de los links y sus propiedades', () => {
    const arrLinks = ['[Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)', 
      '[Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)'];
    const path = './path/mdPrueba.md';
    const objLinks = objecLinks(arrLinks, path);
    const objResult = [{
      text: 'Códigos de estado de respuesta HTTP - MDN',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
      file: './path/mdPrueba.md'
    },{
      text: 'Node.js file system - Documentación oficial',
      href: 'https://nodejs.org/api/fs.html',
      file: './path/mdPrueba.md'
    }];
    expect(objLinks).toEqual(objResult);
  });
  it('deberia de retornar mensaje si el argumento es un array vacio', () => {
    const arrEmpty = [];
    const path = './path/mdPrueba.md';
    const objLinks = objecLinks(arrEmpty, path);
    expect(objLinks).toBe('No hay links en el archivo');
  })
  // it('deberia de retornar mensaje de error si el argumento no es valido', () => {
  //   const string = '';
  //   const path = './path/mdPrueba.md';
  //   const objLinks = objecLinks(string, path);
  //   expect(objLinks).toBe();
  // });
});