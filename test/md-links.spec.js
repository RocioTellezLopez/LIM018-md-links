const mdLinks = require('../');
const { pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension } = require('../index.js');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });

});

describe('pathExists', () => {
  it('deberia de ser una función', () => {
    expect(typeof pathExists).toBe('function');
  });
  it('deberia retornar la ruta si existe', () => {
    const ruta = './example/exampleFile.md';
    const trueRuta = pathExists(ruta);
    expect(trueRuta).toBe(ruta);
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
  it('deberia retornar la ruta si es absoluta', () => {
    const ruta = 'C:\\Users\\USUARIO\\laboratoria\\prueba';
    const isAbsolute = pathAbsolute(ruta);
    expect(isAbsolute).toBe('C:\\Users\\USUARIO\\laboratoria\\prueba');
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
  it('deberia de retornar la extension del archivo si es .md', () => {
    const ruta = 'exampleFile.md';
    const mdExt = mdExtension(ruta);
    expect(mdExt).toBe('.md');
  });
  it('deberia de retornar un mensaje indicando que el archivo tiene extensión .md', () => {
    const ruta = 'index.html';
    const htmlExt = mdExtension(ruta);
    expect(htmlExt).toBe('Err: No es un archivo .md');
  });
  it('deberia de retornar un mensaje indicando que el archivo tiene extensión .md', () => {
    const ruta = 123456;
    const htmlExt = mdExtension(ruta);
    expect(htmlExt).toBe(`La ruta ingresada no es valida: ${ruta}`);
  });
});