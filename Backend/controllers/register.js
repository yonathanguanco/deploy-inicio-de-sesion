// este es el controlador para registrar un usuario
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuarios');


const register = (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    Usuario.findOne({ correo }).then((usuario) => {
        if (usuario) {
            return res.json({ message: "Ya existe un usuario con ese correo" });
        } else if (!nombre || !correo || !contrasena) {
            return res.json({ message: "Faltan campos por completar" });
        } else {
            bcrypt.hash(contrasena, 10, (error, contrasenaHasheada) => {  //es contrasena
                if (error) res.json({ error })
                else {
                    const nuevoUsuario = new Usuario({
                        nombre,
                        correo,
                        contrasena: contrasenaHasheada
                    });
                    nuevoUsuario.save().then((usuario) => {
                        res.json({ message: "Usuario registrado correctamente" })

                    }).catch((error) => console.log(error));
                }
            });
        }

    });

};

module.exports = register;
