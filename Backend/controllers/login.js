
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuarios');

const login = (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    Usuario.findOne({ correo }).then((usuario) => {
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (!usuario.contrasena) {
            return res.status(500).json({ message: "Error interno: usuario sin contraseña" });
        }

        bcrypt.compare(contrasena, usuario.contrasena).then((esCorreta) => {
            if (esCorreta) {
                const { id, nombre } = usuario;

                return res.json({
                    message: "Usuario logueado correctamente",
                    usuario: { id, nombre }
                });
            } else {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }
        }).catch((err) => {
            console.error("Error en bcrypt.compare:", err);
            return res.status(500).json({ message: "Error al verificar la contraseña" });
        });
    }).catch((err) => {
        console.error("Error en Usuario.findOne:", err);
        return res.status(500).json({ message: "Error al buscar usuario" });
    });
};

module.exports = login;



/*const bcrypt = require('bcrypt');
const Usuario = require('../model/usuarios');



const login = (req, res) => {
    const { correo, contrasena } = req.body;

    Usuario.findOne({ correo }).then((usuario) => {
        if (!usuario) {
            return res.json({ message: "Usuario no encontrado" });
        }
        bcrypt.compare(contrasena, usuario.contrasena).then((esCorreta) => {
            if (esCorreta) {

                const { id, nombre } = usuario;

                res.json({
                    message: "Usuario logueado correctamente",
                    usuario: {
                        id,
                        nombre,
                    }
                });
            }  else {
                res.json({ message: "Contraseña incorrecta" });
            }
        });
    });
};

module.exports = login;*/
