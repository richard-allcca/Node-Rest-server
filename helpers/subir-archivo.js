const path = require('path');
const { v4: uuid } = require('uuid');


const extensionesImg = ["png", "jpg", "gif", "jpeg"];

/**
 * It takes a file, validates it, and then saves it to a folder.
 * @param files - The files object that is passed to the function.
 * @param [extensionesValidas] - [] of the valid extensions for the file.
 * @param [carpeta] - The folder where the file will be saved.
 * @returns a promise whith the file name
 */
const uploadFile = (files, extensionesValidas = extensionesImg, carpeta = '') => {


  return new Promise((resolve, reject) => {

    const { archivo } = files;
    // extraer la extencion del archivo
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // validar extension
    if (!extensionesValidas.includes(extension)) {
      return resolve(`La extension "${extension}" no es valida, las extensiones validas son: ${extensionesValidas}`);
    }

    // cambiar nombre del archivo
    const nombreCreado = `${uuid()}.${extension}`;

    // create the path where to save
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreCreado);

    // save file
    archivo.mv(uploadPath, (err) => {
      if (err) {
        //  reject(err)
        reject({
          ok: false,
          msg: "Error al subir el archivo",
        });
      }

      resolve(nombreCreado);
    });
  });
};

module.exports = {
  uploadFile,
};