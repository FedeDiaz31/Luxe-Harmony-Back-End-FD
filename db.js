const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

module.exports = { mongoose, Schema };
