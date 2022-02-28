const mongoose = require("mongoose");
require("dotenv").config(); //pendiente de saber si es necesario

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log("Connecting to MongoDB");


  } catch (error) {
    console.log(error)
    throw new Error("Error connecting to database");
  } 
};

module.exports = {
  dbConnection,
};

// Notas:
//? Importante: para usar variables de entorno "process.env"
// "dotenv": la importacion queda pendiente de ver si es necesario
// obj de opciones para conectar no utiliza "useCreateIndex" & "useFindAndModify"
