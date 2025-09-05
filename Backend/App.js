const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
require("dotenv").config(); // ✅ Carga las variables del .env
const controllers = require("./Controllers");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get("/user/:userId", controllers.getUserById);
app.post("/register", controllers.register);
app.post("/login", controllers.login);

// Conexión a la base de datos
connectDB(); // Ahora usa process.env.MONGO_URI dentro de db.js

// Puerto desde .env
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
// });

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
