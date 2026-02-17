
import Post from './post.model.js';

// 1. Crear publicación
export const savePost = async (req, res) => {
    try {
        const data = req.body;
        const post = new Post(data);
        await post.save();

        return res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente'
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al publicar' });
    }
};

// 2. Editar publicación (Validación de autoría)
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params; 
        const { uid, ...data } = req.body; 

        const post = await Post.findById(id);
        
        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        // VALIDACIÓN: ¿Es el mismo que lo creó?
        if (post.autor.toString() !== uid) {
            return res.status(401).json({
                success: false,
                message: 'No tienes permiso para editar esta publicación'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json({ success: true, updatedPost });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al actualizar' });
    }
};

// 3. Eliminar publicación (Validación de autoría)
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params; 
        const { uid } = req.body; 

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        // VALIDACIÓN: Solo el autor puede eliminar
        if (post.autor.toString() !== uid) {
            return res.status(401).json({
                success: false,
                message: 'No tienes permiso para eliminar esta publicación'
            });
        }

        await Post.findByIdAndDelete(id);
        
        return res.status(200).json({ 
            success: true, 
            message: 'Publicación eliminada correctamente' 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al eliminar' });
    }
};

// Listar todas las publicaciones
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al obtener posts' });
    }
};

// Buscar un post por ID
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        
        if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

        return res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al buscar el post' });
    }
};