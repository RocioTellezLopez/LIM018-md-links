const {mdLinks} = require('../src/index.js');

// const axios = require('axios');
// jest.mock('axios');

describe('mdLinks', () => {
  it('deberia de retornar mensaje de error si la ruta no existe', (done) => {
    const pathFail = './example/prueba';
    const promise = mdLinks(pathFail);
    promise.catch((resErr) => {
      expect(resErr).toBe('La ruta no existe');
      done();
    });
  });

  it('deberia de retornar mensaje de error si la ruta no contine archivos .md', (done) => {
    const pathEmpty = './example/dirEmpty';
    const promise = mdLinks(pathEmpty);
    promise.catch((resErr) => {
      expect(resErr).toBe('La ruta ingresada no contiene ningun archivo .md');
      done();
    });
  });

  it('deberia de retornar un array con 2 elementos si solo se ingresa la ruta', (done) => {
    const pathPrueba = './example/pruebaDir';
    const promise = mdLinks(pathPrueba, {validate: false, stats: false});
    const resultPromise = [
      {
        text: 'markdown-it',
        href: 'https://github.com/markdown-it/markdown-it',
        file: 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md'
      },
      {
        text: 'expresiones regulares (`RegExp`)',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScripttt/Guide/Regular_Expressions',
        file: 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md'
      }
    ];
    promise.then((resArr) => {
      expect(resArr).toHaveLength(2);
      expect(resArr).toEqual(resultPromise);
      done();
    });
  });

  it('deberia de retornar un array con 2 elementos y con propiedades de status y mensaje si se ingresa la opción validate', (done) => {
    const pathPruebaValidate = 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir';
    const promise = mdLinks(pathPruebaValidate, {validate: true, stats: false});
    const resultPromiseValidate = [
      {
        text: 'markdown-it',
        href: 'https://github.com/markdown-it/markdown-it',
        file: 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md',
        status: 200,
        message: 'OK'
      },
      {
        text: 'expresiones regulares (`RegExp`)',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScripttt/Guide/Regular_Expressions',
        file: 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md',
        status: 404,
        message: 'Fail'
      }
    ];
    promise.then((resArrValidate) => {
      expect(resArrValidate).toHaveLength(2);
      expect(resArrValidate).toEqual(resultPromiseValidate);
      done(); // revisar test, mockear la funcion de statusHTTP
    });
  });

  it('deberia de retornar un array con 2 elementos y con propiedades text, href, file, status y message si se ingresa la opción validate', (done) => {
    const pathPruebaValidate = './example/pruebaDir/file.md';
    const promise = mdLinks(pathPruebaValidate, {validate: true, stats: false});
    const resultPromiseValidate = [
      {
        text: 'markdown-it',
        href: 'https://github.com/markdown-it/markdown-it',
        file: 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md',
        status: 200,
        message: 'OK'
      },
      {
        text: 'expresiones regulares (`RegExp`)',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScripttt/Guide/Regular_Expressions',
        file: 'C:\\Users\\USUARIO\\laboratoria\\LIM018-md-links\\example\\pruebaDir\\file.md',
        status: 404,
        message: 'Fail'
      }
    ];
    promise.then((resArrValidate) => {
      expect(resArrValidate).toHaveLength(2);
      expect(resArrValidate).toEqual(resultPromiseValidate);
      done(); // revisar test, mockear la funcion de statusHTTP
    });
  });

  it('deberia de retornar las estadistica de los links en un objeto con propiedades total y unique si la opcion es stats', (done) => {
    const pathStats = './example/pruebaDir';
    const promise = mdLinks(pathStats, {validate: false, stats: true});
    const resultPromiseStats = { total: 2, unique: 2};
    promise.then((resArrStats) => {
      expect(resArrStats).toEqual(resultPromiseStats);
      done();
    });
  });

  it('deberia de retornar las estadistica de los links en un objeto con propiedades total, unique, broken si la opcion es stats y validate', (done) => {
    const pathStatsBroken = './example/pruebaDir';
    const promise = mdLinks(pathStatsBroken, {validate: true, stats: true});
    const resultPromiseStatsBroken = { total: 2, unique: 2, broken: 1};
    promise.then((resArrStatsBroken) => {
      expect(resArrStatsBroken).toEqual(resultPromiseStatsBroken);
      done();
    });
  });

  //completar test para casos que el argumento no sea valido;
});

