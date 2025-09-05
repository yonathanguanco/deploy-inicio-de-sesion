
//este es el controlador para obtener un usuario por su ID

const Usuario = require('../model/usuarios');


const getUserById = (req, res) => {
    const { userId } = req.params;

    if (userId.length === 24) { //caambio de userId a id
       Usuario.findById(userId).then((usuario) => {
        if (!usuario) {
            return res.json({ mensaje: 'No se encontro el usuario' });
        } else {
            const {id, contraseña,  __v, ...resto} = usuario._doc
            res.json(resto);
        }
    });
    }else{
        res.json({ mensaje: 'Estas enviando una contraseña incorrecta' });
    }
};

module.exports = getUserById;
