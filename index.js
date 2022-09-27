const fs = require('fs');
const path = require('path');
const axios = require('axios');
const url = 'https://developer.mozilla.org/es/docs/Web/HTTP/Status';

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
// console.log(pathExists(ruta));
// console.log(pathExists(ruta2));

function pathAbsolute(pathParams) {
  const isAbsolute = path.isAbsolute(pathParams);
  if(isAbsolute) {
    return pathParams;
  }
  // const relativeToAbsolute = path.resolve(pathParams);
  // return relativeToAbsolute;
  return 'La ruta es relativa';
}
// console.log(pathAbsolute(ruta));
// console.log(pathAbsolute(rutaAbsoluta));

function relativeToAbsolute(pathParams) {
  if(typeof pathParams === 'number') {return `La ruta ingresada no es valida: ${pathParams}`;}
  const convertAbsolute = path.resolve(pathParams);
  return convertAbsolute;
}
// console.log(relativeToAbsolute(ruta));
// console.log(relativeToAbsolute(123456));

function mdExtension(pathFile) {
  if(typeof pathFile === 'number') {return `La ruta ingresada no es valida: ${pathFile}`;}
  const extension = path.extname(pathFile);
  if(extension === '.md') {
    return extension;
  }
  return 'Err: No es un archivo .md';
}
// console.log(mdExtension(12345));
// console.log(mdExtension(ruta));

function readFile(pathFile) {
  try{
    const file = fs.readFileSync(pathFile, 'utf8');
    return file;
  }
  catch (err){
    return 'Err: No hay nada en el archivo';
  }
}

// console.log(readFile(ruta));

function saveLinks(pathFile) {
  const content = readFile(pathFile);
  const regExt = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  const arrayLinks = content.match(regExt);
  const nuevoArray = [];
  if(arrayLinks !== null) {
    for(let i=0; i< arrayLinks.length; i++) {
      const indexCut = arrayLinks[i].indexOf(']');
      const textLink = arrayLinks[i].slice(1,indexCut);
      const urlLink = arrayLinks[i].slice(indexCut+2,-1);
      const objeto = {
        text: textLink,
        href: urlLink,
        file: pathFile
      };
      nuevoArray.push(objeto);
    }
    return nuevoArray;
  }
  return 'No hay links en el archivo';
}
// console.log(saveLink(ruta));


// Peticiones HTTP fetch 
// fetch(url)
//   .then((response) => {
//     console.log(response.status); 
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Peticiones HTTP axios
let objEjemplo = [{
  text: 'Códigos de estado de respuesta HTTP - MDN',
  href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
  file: './example/exampleFile.md'
},
{
  text: 'Node.js file system - Documentación oficial',
  href: 'https://nodejs.org/api/fs.html',
  file: './example/exampleFile.md'
},
{
  text: 'Node.js http.get - Documentación oficial',
  href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
  file: './example/exampleFile.md'
}];
let pruebaLinks = saveLinks('README.md');
// console.log(pruebaLinks);
// console.log(objEjemplo.href);

/* function statusHTTP(arrayLinks) {
  const linksResponse = arrayLinks.map((objectLinks) => {
    axios.get(objectLinks.href)
      .then((response) => {
        const statusCode = response.status;
        const messageCode = response.statusText;
        objectLinks.status = statusCode;
        objectLinks.message = messageCode;
        // console.log(objectLinks);
        return objectLinks;
      })
      .catch((error) => {
        if(error.response) {
          objectLinks.status = error.response.status;
          objectLinks.message = 'Fail';
          // console.log(objectLinks);
          return objectLinks;
        }
      // console.log(error);
      });
  });
  return linksResponse;
  // return Promise.all(linksResponse);
} */


// Convirtiendo en array de promesas
// function statusHTTP(arrayLinks) {
  
//   const objectLinks = {};
//   Promise.all(arrayLinks.map((objectLinks) => { return axios.get(objectLinks.href)}))
//     .then((response) => {
//       response.forEach(element => {
//         const statusCode = element.status;
//         const messageCode = element.statusText;
//         objectLinks.status = statusCode;
//         objectLinks.message = messageCode;
//         console.log(objectLinks);
//         return objectLinks;
//       })
        
//     });
// };

async function statusHTTP(arrayLinks) {
  const linksResponse = await Promise.all(
    arrayLinks.map(async (objectLinks) => {
      return await (axios.get(objectLinks.href)
        .then((response) => {
          const statusCode = response.status;
          const messageCode = response.statusText;
          objectLinks.status = statusCode;
          objectLinks.message = messageCode;
          // console.log(objectLinks);
          return objectLinks;
        })
        .catch((error) => {
          if(error.response) {
            objectLinks.status = error.response.status;
            objectLinks.message = 'Fail';
            // console.log(objectLinks);
            return objectLinks;
          }
          // console.log(error);
        })
      );
    })
  );
  return linksResponse;
}
console.log(
  statusHTTP(objEjemplo)
    .then((arrayLinks) => {
      arrayLinks.forEach((obj) => {
        obj.name = 'HolaMundo';
        return obj;
      });
      console.log(arrayLinks);
    })
);

  // const promesas = Promise.all(linksResponse);
  // return promesas;
  // // return Promise.all(linksResponse);

// console.log(posts)

  // const posts = await Promise.all(
  //   usernames.map(async (username) => {
  //     return await fetchPostsFromTwitter(username)
  //   })
  // )

  // function posts(arrayUser) {
  //   arrayUser.map(async (username) => {
  //     return await (axios.get(username.href));
  //   })
  // }
  // console.log(posts);
  // console.log(posts(objEjemplo));

// console.log(statusHTTP(objEjemplo));



// const validate = (valor) => new Promise((resolve, reject) => {
//   resolve (() => {

//   });
//   reject(() => {

//   });
// });





module.exports = {
  pathExists,
  pathAbsolute,
  relativeToAbsolute,
  mdExtension,
  readFile,
  saveLinks
};