El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

[Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
[Node.js file system - Documentación oficial](https://nodejs.org/apiia/fs.html)
[Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)