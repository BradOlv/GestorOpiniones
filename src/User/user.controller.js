import User from './user.model.js';
import bcrypt from 'bcryptjs';

// REGISTRO
export const register = async (req, res, next) => { // Agregamos 'next' aquí
    try {
        const data = req.body;
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        const user = new User(data);
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'Usuario creado con éxito'
        });
    } catch (error) {
        // En lugar de res.status(500), usamos esto:
        next(error); 
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { credential, password } = req.body;

        // Buscamos si el usuario existe por email O por username
        const user = await User.findOne({
            $or: [
                { email: credential },
                { username: credential }
            ]
        });

        // Si el usuario existe
        if (user) {
            // Comparamos la contraseña
            const passwordMatch = bcrypt.compareSync(password, user.password);
            
            if (passwordMatch) {
                return res.status(200).json({
                    success: true,
                    message: 'Login exitoso',
                    user: {
                        id: user._id,
                        username: user.username,
                        nombre: user.nombre
                    }
                });
            }
        }

        // Si llegó aquí es porque el usuario no existe o la contraseña no coincide
        return res.status(401).json({
            success: false,
            message: 'Credenciales incorrectas'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor al loguear'
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword, ...data } = req.body;

        const user = await User.findById(id);

        if (user) {
            // Validamos si el usuario envió ambas contraseñas para el cambio
            if (oldPassword) {
                if (newPassword) {
                    const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
                    
                    if (passwordMatch) {
                        const salt = bcrypt.genSaltSync(10);
                        data.password = bcrypt.hashSync(newPassword, salt);
                    } else {
                        return res.status(400).json({ 
                            success: false, 
                            message: 'La contraseña anterior es incorrecta' 
                        });
                    }
                }
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            return res.status(200).json({ 
                success: true, 
                message: 'Perfil actualizado con éxito', 
                updatedUser 
            });
        }

        return res.status(404).json({ 
            success: false, 
            message: 'Usuario no encontrado' 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error al actualizar el perfil' 
        });
    }
};