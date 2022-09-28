// const mdLinks = require('../');
const { pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension,
  readFile } = require('../index.js');

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
    const ruta = './example/exampleFile.md';
    const trueRuta = pathExists(ruta);
    expect(trueRuta).toBe(true);
  });
  it('deberia retornar un mensaje si la ruta no existe', () => {
    const ruta = './example/example.md';
    const trueRuta = pathExists(ruta);
    expect(trueRuta).toBe('Err: La ruta no existe');
  });
  it('deberia retornar un mensaje si la ruta ingresada es un string', () => {
    const ruta = 'example.md';
    const trueRuta = pathExists(ruta);
    expect(trueRuta).toBe('Err: La ruta no existe');
  });
});

describe('pathAbsolute', () => {
  it('deberia de ser una función', () => {
    expect(typeof pathAbsolute).toBe('function');
  });
  it('deberia retornar true si la ruta es absoluta', () => {
    const ruta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
    const isAbsolute = pathAbsolute(ruta);
    expect(isAbsolute).toBe(true);
  });
  it('deberia retornar un mensaje si la ruta es relativa', () => {
    const ruta = '../example/index.html';
    const isAbsolute = pathAbsolute(ruta);
    expect(isAbsolute).toBe('La ruta es relativa');
  });
});

describe('relativeToAbsolute', () => {
  it('deberia de ser una función', () => {
    expect(typeof relativeToAbsolute).toBe('function');
  });
  it('deberia convertir la ruta relativa a ruta absoluta', () => {
    const ruta = './example/exampleFile.md';
    const convertToAbsolute = relativeToAbsolute(ruta);
    expect(convertToAbsolute).toBe('C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\exampleFile.md');
  });
  it('deberia retornar ruta no valida si se ingresa una ruta que no es un string', () => {
    const ruta = 12345;
    const convertToAbsolute = relativeToAbsolute(ruta);
    expect(convertToAbsolute).toBe(`La ruta ingresada no es valida: ${ruta}`);
  });
});

describe('mdExtension', () => {
  it('deberia de retornar true si la extension del archivo es .md', () => {
    const ruta = 'exampleFile.md';
    const mdExt = mdExtension(ruta);
    expect(mdExt).toBe(true);
  });
  it('deberia de retornar un mensaje indicando que el archivo no tiene extensión .md', () => {
    const ruta = 'index.html';
    const htmlExt = mdExtension(ruta);
    expect(htmlExt).toBe('Err: No es un archivo .md');
  });
  it('deberia de retornar un mensaje indicando que la ruta no es valida si la ruta no es un string', () => {
    const ruta = 123456;
    const htmlExt = mdExtension(ruta);
    expect(htmlExt).toBe(`La ruta ingresada no es valida: ${ruta}`);
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
    [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)`
    const ruta = './example/exampleFile.md';
    const content = readFile(ruta);
    // expect(content).toBe(stringContent);
    // expect(content).toReturnWith(stringContent);
    expect(content).toContain('Códigos de estado de respuesta HTTP');
    // expect(content).toContain('Códigos de estado de respuesta HTTP - MDN'),
  });
  it('deberia de retornar mensaje si el argumento es un directorio', () => {
    const ruta = './example';
    const content = readFile(ruta);
    expect(content).toBe('Err: No hay nada en el archivo');
  });
});

// describe('saveLinks', () => {
//   it('deberia ... ', () => {
//     // expect()
//   })
// })