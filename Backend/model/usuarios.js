const { model, Schema } = require('mongoose');
const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
   
});

module.exports = model('Usuario', UsuarioSchema); // Exportar el modelo de usuario
// Usuario es la colecion que se creará en la base de datos