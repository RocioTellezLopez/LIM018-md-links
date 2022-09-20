const mdLinks = require('../');
const {pathExists} = require('../index.js');

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