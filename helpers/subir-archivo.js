const path = require('path');
const { v4: uuid } = require('uuid');


const extensionesImg = [ "png", "jpg", "gif", "jpeg" ];

/**
 * It takes a file, validates it, and then saves it to a folder.
 * 
 * extensionesValidas is an array of valid file extensions.
 * 
 * The function returns a promise.
 * 
 * The promise resolves with the name of the file.
 * 
 * subirArchivo(files, extensionesValidas, carpeta)
 * 
 * @param files - The files object that is passed to the function.
 * @param [extensionesValidas] - The valid extensions for the file.
 * @param [carpeta] - The folder where the file will be saved.
 * @returns a promise.
 */
const subirArchivo = (files, extensionesValidas = extensionesImg, carpeta = '') => {

  const { archivo } = files;

  return new Promise((resolve, reject) => {

    // extraer la extencion del archivo 
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[ nombreCortado.length - 1 ];

    // validar extension
    if (!extensionesValidas.includes(extension)) {
      return resolve(`La extension "${extension}" no es valida, las extensiones validas son: ${extensionesValidas}`)
    }

    // cambiar nombre del archivo
    const nombreCreado = `${uuid()}.${extension}`;

    // crear el path para guardar el archivo
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreCreado);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        //? reject(err) pendiente de uso
        reject({
          ok: false,
          msg: "Error al subir el archivo",
        });
      }

      resolve(nombreCreado)
    })


  })
}

module.exports = {
  subirArchivo,
}