// const mdLinks = require('../');
const { pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension,
  readFile, 
  saveArrayLinks,
  objecLinks,
  statusHTTP,
  statsUnique,
  statsBroken} = require('../src/methods.js');

const axios = require('axios');
jest.mock('axios');

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
  });
});

describe('statusHTTP', () => {
  it('deberia de retornar un array con objetos con propiedades de status: 200 y message: OK', () => {
    axios.get.mockImplementation(() => Promise.resolve({status: 200, statusText: 'OK'}));
    const arrayLinks = [{
      text: 'Códigos de estado de respuesta HTTP - MDN',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
      file: './example/exampleFile.md'
    },
    {
      text: 'Node.js file system - Documentación oficial',
      href: 'https://nodejs.org/api/fs.html',
      file: './example/exampleFile.md'
    }];
    const arrayStatusHTTP = statusHTTP(arrayLinks);
    const arrResult = [{
      text: 'Códigos de estado de respuesta HTTP - MDN',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
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
    }];
    arrayStatusHTTP.then((response) => {
      expect(response).toEqual(arrResult);
    });
  });
  // it('deberia de retornar un array con objetos con propiedades de status: 404  y message: Fail', () => {
  //   axios.get.mockImplementation(() => Promise.reject({status: 404, statusText: 'Fail'}));
  //   const arrayLinks = [{
  //     text: 'Node.js http.get - Documentación oficial',
  //     href: 'https://nodejs.org/apiia/http.html#http_http_get_options_callback',
  //     file: './example/exampleFile.md'
  //   }];
  //   const arrayStatusFail = statusHTTP(arrayLinks);
  //   const arrResultFail = [{
  //     text: 'Node.js http.get - Documentación oficial',
  //     href: 'https://nodejs.org/apiia/http.html#http_http_get_options_callback',
  //     file: './example/exampleFile.md',
  //     status: 404,
  //     message: 'Fail'
  //   }];
  //   arrayStatusFail.then((res) => {
  //     console.log(res);
  //     expect(res).toEqual(arrResultFail);
  //   });
  // });
});

describe('statsUnique', () => {
  it('deberia de retornar el total de links y links unicos de un array', () =>{
    const arrFiles = [{
      text: 'Códigos de estado de respuesta HTTP - MDN',
      href: 'https://developer.mozilla.org/esss/docs/Web/HTTP/Status',
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

    const linksUnique = statsUnique(arrFiles);

    expect(linksUnique).toEqual({total: 5, unique: 3});
  });

  it('deberia retornar links total y unicos 0, si se ingresa un array vacio', () => {
    const arrFiles = [];

    const linksUnq = statsUnique(arrFiles);

    expect(linksUnq).toEqual({total: 0, unique: 0});
  });

  it('deberia retornar mensaje de error si el argumento no es un array', () => {
    const arrFiles = '';

    const linksUnq = statsUnique(arrFiles);

    expect(linksUnq).toBe('err: El argumento ingresado no es un array.');
  });
});

describe('statsBroken', () => {
  it('deberia de retornar el numero de links Fail de un array', () => {
    const arrBroken = [{
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
      status: 404,
      message: 'Fail'
    },
    {
      text: 'Node.js http.get - Documentación oficial',
      href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
      file: './example/exampleFile.md',
      status: 200,
      message: 'OK'
    }];

    const linksBroken = statsBroken(arrBroken);

    expect(linksBroken).toEqual({broken: 2});
  });

  it('deberia de retornar', () => {
    const arrEmpty = [];

    const linksBrokenEmpty = statsBroken(arrEmpty);

    expect(linksBrokenEmpty).toEqual({broken: 0});
  });
});